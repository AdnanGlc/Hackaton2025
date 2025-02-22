using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public partial class RecipeProduct
{
    [Key]
    public int Id { get; set; }
    public int RecipeId { get; set; }

    public int ProductId { get; set; }

    public float QuantityKg { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual Recipe Reciept { get; set; } = null!;
}
