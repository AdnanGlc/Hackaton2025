using System.Net;
using System.Net.Mail;

namespace backend.Services.EmailService
{
    public class EmailSender : IEmailSender
    {
        private readonly string _host;
        private readonly int _port;
        private readonly bool _enableSsl;
        private readonly string _userName;
        private readonly string _password;

        public EmailSender(IConfiguration configuration)
        {
            var smtpSettings = configuration.GetSection("SmtpSettings");
            _host = smtpSettings["Host"];
            _port = int.Parse(smtpSettings["Port"]);
            _enableSsl = bool.Parse(smtpSettings["EnableSsl"]);
            _userName = smtpSettings["UserName"];
            _password = smtpSettings["Password"];
        }

        public async Task SendEmailAsync(string[] emails, string subject, string message)
        {
            using var client = new SmtpClient(_host, _port)
            {
                EnableSsl = _enableSsl,
                Credentials = new NetworkCredential(_userName, _password)
            };

            foreach (var email in emails)
            {
                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_userName),
                    Subject = subject,
                    Body = message,
                    IsBodyHtml = true
                };
                mailMessage.To.Add(email);

                await client.SendMailAsync(mailMessage);
            }
        }
    }
}
