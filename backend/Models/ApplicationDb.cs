using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public partial class ApplicationDb : DbContext
{
    public ApplicationDb()
    {
    }

    public ApplicationDb(DbContextOptions<ApplicationDb> options)
        : base(options)
    {
    }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Recipe> Recipes { get; set; }

    public virtual DbSet<RecipeProduct> RecipeProducts { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserProduct> UserProducts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=hackaton2025;Integrated Security=True;Pooling=False;Encrypt=False;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Price).HasColumnType("money");
        });

        modelBuilder.Entity<Recipe>(entity =>
        {
            entity.Property(e => e.Description).HasMaxLength(1024);
            entity.Property(e => e.Image).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(50);

            entity.HasOne(d => d.User).WithMany(p => p.Recipes)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Recipes_Users");
        });

        modelBuilder.Entity<RecipeProduct>(entity =>
        {
            entity.HasKey(e => new { e.RecieptId, e.ProductId });

            entity.HasOne(d => d.Product).WithMany(p => p.RecipeProducts)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecipeProducts_Products");

            entity.HasOne(d => d.Reciept).WithMany(p => p.RecipeProducts)
                .HasForeignKey(d => d.RecieptId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecipeProducts_Recipes");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(50);
        });

        modelBuilder.Entity<UserProduct>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.ProiductId });

            entity.HasOne(d => d.Proiduct).WithMany(p => p.UserProducts)
                .HasForeignKey(d => d.ProiductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserProducts_Products");

            entity.HasOne(d => d.User).WithMany(p => p.UserProducts)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserProducts_Users");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
