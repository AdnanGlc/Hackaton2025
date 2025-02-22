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
            var recipe = await db.Recipes.FirstOrDefaultAsync(r => r.Id == request);
            if (recipe == null)
            {
                return BadRequest("No recipe with specified if");
            }
            return Ok(recipe);
        }
    }
}
