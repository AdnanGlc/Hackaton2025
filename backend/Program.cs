using backend.Extensions;
using backend.Models;
using backend.Services.MonthlyResetService;
using Hangfire;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDb>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Database")));
builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHangfire(configuration =>
{
    configuration.UseSqlServerStorage(builder.Configuration.GetConnectionString("Database"));
});
builder.Services.AddHangfireServer();


builder.Services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDb>()
                .AddDefaultTokenProviders()
                .AddApiEndpoints();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true; // Kolačić je dostupan samo putem HTTP zahtjeva
    options.Cookie.SecurePolicy = CookieSecurePolicy.None; // Omogućava korištenje kolačića na HTTP
    options.Cookie.SameSite = SameSiteMode.Strict; // Omogućava korištenje kolačića u različitim domenama (ako je potrebno)
    options.ExpireTimeSpan = TimeSpan.FromMinutes(60); // Trajanje kolačića
    options.SlidingExpiration = true; // Omogućava produžavanje trajanja kolačića s aktivnim zahtjevima
});


// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder => builder.WithOrigins("http://localhost:5173")  // Allow React app running on this port
                          .AllowCredentials()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.ApplyMigrations();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
// Apply CORS before Authorization middleware
app.UseCors("AllowLocalhost");  // Apply CORS policy

app.UseAuthorization();

app.MapControllers();

app.UseHangfireDashboard();

// Registracija ponavljajućeg posla
RecurringJob.AddOrUpdate<MonthlyResetService>(
    x => x.PerformMonthlyReset(CancellationToken.None),
    Cron.MinuteInterval(1)
);

app.Run();
