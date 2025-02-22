using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public partial class UserProduct
{
    [Key]
    public int Id { get; set; }
    public int UserId { get; set; }

    public int ProiductId { get; set; }

    public double QuantityKg { get; set; }

    public virtual Product Proiduct { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
