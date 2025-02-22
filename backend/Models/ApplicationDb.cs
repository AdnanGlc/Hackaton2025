using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public class ApplicationDb : IdentityDbContext<User>
{
    public ApplicationDb(DbContextOptions<ApplicationDb> options)
        : base(options)
    {
    }

    public virtual DbSet<Product> Products { get; set; }
    public virtual DbSet<Recipe> Recipes { get; set; }
    public virtual DbSet<RecipeProduct> RecipeProducts { get; set; }
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<UserProduct> UserProducts { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.HasDefaultSchema("identity");

        builder.Entity<Product>()
            .Property(p => p.Price)
            .HasPrecision(18, 2); 

        builder.Entity<User>().ToTable("Users", "identity");
        builder.Entity<IdentityRole>().ToTable("AspNetRoles", "identity");
        builder.Entity<IdentityUserRole<string>>().ToTable("AspNetUserRoles", "identity");
        builder.Entity<IdentityUserClaim<string>>().ToTable("AspNetUserClaims", "identity");
        builder.Entity<IdentityUserLogin<string>>().ToTable("AspNetUserLogins", "identity");
        builder.Entity<IdentityUserToken<string>>().ToTable("AspNetUserTokens", "identity");
        builder.Entity<IdentityRoleClaim<string>>().ToTable("AspNetRoleClaims", "identity");
    }
}