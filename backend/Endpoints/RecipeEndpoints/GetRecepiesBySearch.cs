using backend.Helpers.API;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints.RecipeEndpoints
{
    public class GetRecepiesBySearch(ApplicationDb db) : EndpointBaseAsync
        .WithRequest<string>
        .WithActionResult<RecipeAllResponse[]>
    {
        [HttpGet]
        
        public async override Task<ActionResult<RecipeAllResponse[]>> HandleAsync(string request, CancellationToken cancellationToken = default)
        {
            return await db.Recipes.Include(r => r.User)
                .Where(r=>r.Name.ToLower().Contains(request) || r.Description.ToLower().Contains(request))
                .Select(r => new RecipeAllResponse
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
}
