

using backend.Helpers.API;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints.UserProducts
{
    public class UserProductRemove(ApplicationDb db) : EndpointBaseAsync
        .WithRequest<UserProductRemoveRequest>
        .WithResult<UserProductRemoveResponse[]>
    {
        [HttpDelete]
        public override async Task <UserProductRemoveResponse[]> HandleAsync(
            UserProductRemoveRequest request,
            CancellationToken cancellationToken = default)
        {
            var userProduct = await db.UserProducts
                .FirstOrDefaultAsync(up =>
                    up.UserId == request.UserId &&
                    up.ProiductId == request.ProductId,
                    cancellationToken);

            if (userProduct == null)
                throw new Exception("UserProduct not found.");

            db.UserProducts.Remove(userProduct);
            await db.SaveChangesAsync(cancellationToken);

            var result = await db.UserProducts
                .Include(up => up.Proiduct)
                .Where(up => up.UserId == request.UserId)
                .Select(up => new UserProductRemoveResponse
                {
                    ProductId = up.ProiductId,
                    Co2PerKg = up.Proiduct.Co2PerKg, // Pull from Product, not UserProduct
                    QuantityKg = up.QuantityKg,
                    Points = up.Proiduct.Points,
                    Name = up.Proiduct.Name
                })
                .ToArrayAsync(cancellationToken);

           return result;
        }
    }
    public class UserProductRemoveRequest
    {
        public string UserId { get; set; }
        public int ProductId { get; set; }
    }
    public class UserProductRemoveResponse
    {
        public int ProductId { get; set; }
        public double Co2PerKg { get; set; }
        public int Points { get; set; }
        public double QuantityKg { get; set; }
        public string Name { get; set; }
    }
}
