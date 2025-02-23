
using backend.Models;
using backend.Services.EmailService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.MonthlyResetService
{

    public class MonthlyResetService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<MonthlyResetService> _logger;
        public MonthlyResetService(IServiceProvider serviceProvider, ILogger<MonthlyResetService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await PerformMonthlyReset(stoppingToken);
                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
            }
        }

        public async Task PerformMonthlyReset(CancellationToken cancellationToken)
        {
            if (DateTime.UtcNow.Day == 1) // ako je prvi u mejsecu
            {
                _logger.LogInformation("Restart Co2 svim korisnicima");

                using (var scope = _serviceProvider.CreateScope())
                {
                    var db = scope.ServiceProvider.GetRequiredService<ApplicationDb>(); 
                    var emailService = scope.ServiceProvider.GetRequiredService<IEmailSender>();

                    var users = await db.Users.ToListAsync(cancellationToken);

                    var usersWithPoints = new List<string>();   //lista emailova
                    var usersWithoutPoints = new List<string>();

                    foreach (var user in users)
                    {
                        if (user.Co2ThisMonth <= 400)
                        {
                            user.Points += 100;
                            usersWithPoints.Add(user.Email!);
                        }
                        else
                        {
                            usersWithoutPoints.Add(user.Email!);
                        }

                        user.Co2ThisMonth = 0; // reset za sve
                    }

                    if (usersWithPoints.Any())//grupno slanje emaila
                    {
                        await emailService.SendEmailAsync(
                            usersWithPoints.ToArray(),
                            "Čestitke na bodovima!",
                            "Prošli mjesec ste imali manje od 400 kg CO2, zbog čega ste dobili 100 bodova! CO2 je resetiran na 0."
                        );
                    }

                    if (usersWithoutPoints.Any())
                    {
                        await emailService.SendEmailAsync(
                            usersWithoutPoints.ToArray(),
                            "CO2 resetiran",
                            "Prošli mjesec ste imali više od 400 kg CO2. Nema bodova, ali CO2 je resetiran na 0."
                        );
                    }

                    await db.SaveChangesAsync(cancellationToken); // Spremi sve promjene u bazu
                }
            }
        }
    }
}
