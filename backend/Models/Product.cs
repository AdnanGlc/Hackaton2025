using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public partial class Product
{
    [Key]
    public int Id { get; set; }

    public decimal Price { get; set; }

    public string Name { get; set; } = null!;

    public double Co2PerKg { get; set; }

    public int Points { get; set; }

    public double QuantityKg { get; set; }

    public virtual ICollection<RecipeProduct> RecipeProducts { get; set; } = new List<RecipeProduct>();

    public virtual ICollection<UserProduct> UserProducts { get; set; } = new List<UserProduct>();
}
