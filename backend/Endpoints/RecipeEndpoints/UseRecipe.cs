using backend.Helpers.API;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints.RecipeEndpoints
{
    public class UseRecipe(ApplicationDb db) : EndpointBaseAsync
        .WithRequest<UseRecipeRequestDTO>
        .WithActionResult
    {
        [HttpPost]
        [AllowAnonymous]
        public async override Task<ActionResult> HandleAsync(UseRecipeRequestDTO request, CancellationToken cancellationToken = default)
        {
            var user = await db.Users
                .Include(u => u.UserProducts)
                .FirstOrDefaultAsync(u => u.Id == request.UserId); 
            var recipe = await db.Recipes
                .Include(r=>r.RecipeProducts)
                .FirstOrDefaultAsync(r => r.Id == request.RecipeId);

            if (user == null || recipe == null)
                return BadRequest("No recipe or student");

      
            for (int i = 0; i < recipe.RecipeProducts.Count; i++)
            {
                var recipeProduct = recipe.RecipeProducts.ElementAt(i);

                for (int j = 0; j < user.UserProducts.Count; j++)
                {
                    var userProduct = user.UserProducts.ElementAt(j);

                    if (userProduct.ProiductId == recipeProduct.ProductId)
                    {
                        userProduct.QuantityKg -= recipeProduct.QuantityKg;
                    }
                }
            }

            recipe.Popularity++;
            await db.SaveChangesAsync();
            return Ok("Enjoy your meal!");



        }
    }

    public class UseRecipeRequestDTO
    {
        public string UserId { get; set; }
        public int RecipeId { get; set; }
    }
}
