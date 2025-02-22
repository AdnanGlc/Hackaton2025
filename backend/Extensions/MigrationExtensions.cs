using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Extensions;

public static class MigrationExtensions
{
    public static void ApplyMigrations(this IApplicationBuilder app)
    {
        using IServiceScope scope = app.ApplicationServices.CreateScope();

        using ApplicationDb context = scope.ServiceProvider.GetRequiredService<ApplicationDb>();

        context.Database.Migrate();
    }
}
