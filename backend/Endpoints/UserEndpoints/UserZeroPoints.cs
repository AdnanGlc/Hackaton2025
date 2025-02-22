using backend.Helpers.API;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints.UserEndpoints
{
    public class UserZeroPoints(ApplicationDb db) : EndpointBaseAsync
        .WithRequest<UserAddPointsRequst>
        .WithResult<int> // Return the number of points consumed
    {
        [HttpPost]
        public override async Task<int> HandleAsync(UserAddPointsRequst request, CancellationToken cancellationToken = default)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Id == request.UserID, cancellationToken);
            if (user == null) throw new Exception("No user with the given ID");

            var totalCo2 = 0.0f;
            var totalPointsConsumed = user.Points; // Store the points before resetting

            foreach (var product in request.Receipt)
            {
                totalCo2 += product.Co2PerKg * product.QuantityKg;

                var userProduct = await db.UserProducts
                    .FirstOrDefaultAsync(up => up.ProiductId == product.ProductId && up.UserId == request.UserID, cancellationToken);

                if (userProduct != null)
                    userProduct.QuantityKg += product.QuantityKg;
                else
                {
                    userProduct = new UserProduct { UserId = request.UserID, ProiductId = product.ProductId, QuantityKg = product.QuantityKg };
                    db.UserProducts.Add(userProduct);
                }
            }

            // Update CO2 totals but reset points
            user.Co2Total += totalCo2;
            user.Co2ThisMonth += totalCo2;
            user.Points = 0; // Reset points after consumption

            await db.SaveChangesAsync();
            return totalPointsConsumed;
        }
    }

}
