using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public partial class User : IdentityUser
{
    [Key]
    public int Id { get; set; }

    public double Co2ThisMonth { get; set; }

    public double Co2Total { get; set; }

    public int Points { get; set; }



    public virtual ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();

    public virtual ICollection<UserProduct> UserProducts { get; set; } = new List<UserProduct>();
}
