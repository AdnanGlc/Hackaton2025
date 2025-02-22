using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Recipe
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Image { get; set; } = null!;

    public int UserId { get; set; }

    public virtual ICollection<RecipeProduct> RecipeProducts { get; set; } = new List<RecipeProduct>();

    public virtual User User { get; set; } = null!;
}
