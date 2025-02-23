using backend.Helpers.API;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints.RecipeEndpoints
{
    public class RecipeGetById(ApplicationDb db) : EndpointBaseAsync
        .WithRequest<int>
        .WithActionResult<Recipe>
    {
        [HttpGet]
        public override async Task<ActionResult<Recipe>> HandleAsync(int request, CancellationToken cancellationToken = default)
        {
            var recipe = await db.Recipes
          .Include(r => r.RecipeProducts)
          .ThenInclude(rp=>rp.Product)
          .Where(r => r.Id == request)
          .Select(r => new RecipeResponse
          {
              Products = r.RecipeProducts.Select(rp=>new ProductDTO { Name = rp.Product.Name}).ToList(),
              Id = r.Id,
              Name = r.Name,
              Description = r.Description,
              Image = r.Image,
              User = r.User.UserName!
          })
          .FirstOrDefaultAsync();


            if (recipe == null)
            {
                return BadRequest("No recipe with specified if");
            }
            return Ok(recipe);
        }

        public class RecipeResponse
        {
            public int Id { get; set; }

            public string Name { get; set; } = null!;

            public string Description { get; set; } = null!;

            public string Image { get; set; } = null!;

            public string User { get; set; }

            public  List<ProductDTO> Products { get; set; }
        }

        public class ProductDTO
        {
            public  string  Name { get; set; }
        }
    }
}
