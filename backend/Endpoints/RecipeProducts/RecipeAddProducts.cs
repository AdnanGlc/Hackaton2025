using backend.Helpers.API;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Endpoints.RecipeProducts
{
    public class RecipeAddProducts(ApplicationDb db) : EndpointBaseAsync
        .WithRequest<RecipeProductsAddRequest>
        .WithoutResult
    {
        [HttpPost]
        public override async Task HandleAsync(RecipeProductsAddRequest request, CancellationToken cancellationToken = default)
        {
            foreach(var products in request.Products)
                 db.RecipeProducts.Add(new RecipeProduct { ProductId = products.ProductId,QuantityKg = products.QuantityKg,RecipeId=request.RecipeId });
            await db.SaveChangesAsync();
        }
    }
    public class RecipeProductRequest
    {
        public int ProductId { get; set; }
        public float QuantityKg { get; set; }
    }
    public class RecipeProductsAddRequest
    {
        public int RecipeId { get; set; }
        public RecipeProductRequest[] Products { get; set; }
    }
}
