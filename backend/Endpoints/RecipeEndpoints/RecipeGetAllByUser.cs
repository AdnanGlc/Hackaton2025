using backend.Helpers.API;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints.RecipeEndpoints
{
    public class RecipeGetAllByUser(ApplicationDb db) : EndpointBaseAsync
        .WithRequest<string>
        .WithResult<Recipe[]>
    {
        [HttpGet]
        [AllowAnonymous]
        public async override Task<Recipe[]> HandleAsync(string request, CancellationToken cancellationToken = default)
        {

            return await db.Recipes.Where(r => r.UserId.Equals(request)).ToArrayAsync(cancellationToken);
        }
    }
}
