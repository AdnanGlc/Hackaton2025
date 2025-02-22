using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public partial class Recipe
{
    [Key]
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null;

    public string Image { get; set; } = null;

    public int Popularity { get; set; }

    public virtual ICollection<RecipeProduct> RecipeProducts { get; set; } = new List<RecipeProduct>();


    public string UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public virtual User User { get; set; } = null!;
}
