using backend.Helpers.API;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints.RecipeEndpoints
{
    public class RecipeGetAll(ApplicationDb db) : EndpointBaseAsync
        .WithRequest
        .WithResult<RecipeAllResponse[]>
    {
        [HttpGet]
        public override Task<RecipeAllResponse[]> HandleAsync(CancellationToken cancellationToken = default)
        {
            return db.Recipes.Include(r => r.User).Select(r => new RecipeAllResponse
            {
                RecipeProducts = r.RecipeProducts.ToList(),
                Id = r.Id,
                Name = r.Name,
                Description = r.Description,
                Image = r.Image,
                User = r.User.UserName!,
            }).ToArrayAsync(cancellationToken);
        }
    }
    public class RecipeAllResponse
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string Image { get; set; } = null!;

        public string User { get; set; }

        public virtual List<RecipeProduct> RecipeProducts { get; set; }
    }
}
