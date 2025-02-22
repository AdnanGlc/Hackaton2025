using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class RecipeProduct
{
    public int RecieptId { get; set; }

    public int ProductId { get; set; }

    public int QuantityKg { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual Recipe Reciept { get; set; } = null!;
}
