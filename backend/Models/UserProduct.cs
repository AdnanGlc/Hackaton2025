using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class UserProduct
{
    public int UserId { get; set; }

    public int ProiductId { get; set; }

    public double QuantityKg { get; set; }

    public virtual Product Proiduct { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
