using backend.Helpers.API;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints.RecipeEndpoints
{
    public class RecipeDeleteEndpoint(ApplicationDb db) : EndpointBaseAsync
        .WithRequest<int>
        .WithoutResult
    {
        [HttpDelete]
        [AllowAnonymous]
        public override async Task HandleAsync(int request, CancellationToken cancellationToken = default)
        {
            var recipe =await db.Recipes.FirstOrDefaultAsync(r=> r.Id == request,cancellationToken);

            if (recipe == null) throw new Exception("No Recipe with request id exists");

            db.Recipes.Remove(recipe);
            await db.SaveChangesAsync(cancellationToken);
        }
    }
}
