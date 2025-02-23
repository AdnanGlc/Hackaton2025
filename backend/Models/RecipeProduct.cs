using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public partial class RecipeProduct
{
    [Key]
    public int Id { get; set; }
    public int RecipeId { get; set; }

    public int ProductId { get; set; }

    public float QuantityKg { get; set; }
    public  Product Product { get; set; } = null!;

    public  Recipe Reciept { get; set; } = null!;
}
