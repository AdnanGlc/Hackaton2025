using backend.Helpers.API;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace backend.Endpoints.UserEndpoints
{
    public class UserGetProducts(ApplicationDb db) : EndpointBaseAsync
        .WithRequest<string>
        .WithResult<UserProductResponse[]>
    {
        [HttpGet]
        public override async Task<UserProductResponse[]> HandleAsync(string request, CancellationToken cancellationToken = default)
        {
            return await db.UserProducts
                .Where(up=> up.UserId == request)
                .Include(up => up.Proiduct)
                .Select(up => new UserProductResponse
                {
                    ProductId = up.ProiductId,
                    Co2PerKg = up.Proiduct.Co2PerKg,
                    QuantityKg = up.QuantityKg,
                    Name = up.Proiduct.Name,
                    Points = up.Proiduct.Points
                })
                .ToArrayAsync(cancellationToken);
        }
    }
    public class UserProductResponse
    {
        public int ProductId { get; set; }
        public double Co2PerKg { get; set; }
        public int Points { get; set; }
        public double QuantityKg { get; set; }
        public string Name { get; set; }
    }
}
