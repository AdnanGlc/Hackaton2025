using backend.Helpers.API;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints.RecipeEndpoints
{
    public class RecipeUpdateOrInsertEndpoint(ApplicationDb db) : EndpointBaseAsync
        .WithRequest<RecipeUpdateOrInsertRequest>
        .WithResult<int>
    {
        private readonly IBlobService blobService = new BlobService("hackaton2025");
        [HttpPost]
        [AllowAnonymous]
        public override async Task<int> HandleAsync(RecipeUpdateOrInsertRequest request, CancellationToken cancellationToken = default)
        {
            
            Recipe? r;

            if (request.Id == null || request.Id == 0)
            {
                r = new Recipe();
                db.Recipes.Add(r);
            }
            else
            {
                r = await db.Recipes
                    .Include(x => x.RecipeProducts)
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                if (r == null)
                    throw new Exception($"Recipe with ID {request.Id} not found.");
            }

            r.Description = request.Description;
            r.Name = request.Name;
            r.UserId = request.UserId;

            if (request.Image != null)
                r.Image = await blobService.UploadFileFromStreamAsync(request.Image);

            await db.SaveChangesAsync(cancellationToken);
            
            return r.Id;
        }
    }

    public class RecipeUpdateOrInsertRequest
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public IFormFile? Image { get; set; }
        public string UserId { get; set; }
    }
}
