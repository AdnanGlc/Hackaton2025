using backend.Helpers.API;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints.ProductEndpoints
{
    public class ProductGetAllEndpoint(ApplicationDb db) : EndpointBaseAsync
        .WithRequest
        .WithResult<ProductResponse[]>
    {
        [HttpGet]
        [AllowAnonymous]
        public override async Task<ProductResponse[]> HandleAsync(CancellationToken cancellationToken = default)
        {
            return await db.Products.Select(p =>
                new ProductResponse
                {
                    Id = p.Id,
                    Co2PerKg = p.Co2PerKg,
                    Price = p.Price,
                    Points = p.Points,
                    Name = p.Name!,
                    QuantityKg = p.QuantityKg
                }
            ).ToArrayAsync();
        }
    }
    public class ProductResponse
    {
        public int Id { get; set; }
        public decimal Price { get; set; }
        public double Co2PerKg { get; set; }
        public int Points { get; set; }
        public double QuantityKg { get; set; }
        public string Name { get; set; }
    }
}
