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
        .WithoutResult
    {
        private readonly IBlobService blobService = new BlobService("hackaton2025");
        [HttpPost]
        [AllowAnonymous]
        public override async Task HandleAsync(RecipeUpdateOrInsertRequest request, CancellationToken cancellationToken = default)
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

            if (request.Products != null && request.Products.Any())
            {
                var existingProducts = r.RecipeProducts.ToList();

                foreach (var product in request.Products)
                {
                    var existingProduct = existingProducts.FirstOrDefault(p => p.ProductId == product.ProductId);

                    if (product.QuantityKg == 0)
                    {
                        // ako proizvod postoji i quantity je 0, brisemo ga
                        if (existingProduct != null)
                        {
                            db.RecipeProducts.Remove(existingProduct);
                        }
                    }
                    else
                    {
                        if (existingProduct != null)
                        {
                            // ako proizvod vec postoji azuriramo kolicinu
                            existingProduct.QuantityKg = product.QuantityKg;
                        }
                        else
                        {
                            // ako proizvod ne postoji, dodajemo ga
                            r.RecipeProducts.Add(new RecipeProduct
                            {
                                RecipeId = r.Id,
                                ProductId = product.ProductId,
                                QuantityKg = product.QuantityKg
                            });
                        }
                    }
                }
            }

            await db.SaveChangesAsync(cancellationToken);
        }
    }

    public class RecipeProductInsertOrUpdateRequest
    {
        public int ProductId { get; set; }
        public float QuantityKg { get; set; }
    }

    public class RecipeUpdateOrInsertRequest
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public IFormFile? Image { get; set; }
        public string UserId { get; set; }
        public List<RecipeProductInsertOrUpdateRequest>? Products { get; set; }
    }
}
