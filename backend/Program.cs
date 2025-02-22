using backend.Extensions;
using backend.Models;
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

app.MapControllers();


app.Run();
