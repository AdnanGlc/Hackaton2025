using backend.Helpers.API;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints.UserEndpoints
{
    public class UserConsumePoints(ApplicationDb db) : EndpointBaseAsync
        .WithRequest<UserConsumePointsRequst>
        .WithResult<int>//return a number of points user gained 

    {
        [HttpPost]
        public override async Task<int> HandleAsync(UserConsumePointsRequst request, CancellationToken cancellationToken = default)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Id == request.UserID,cancellationToken);
            if (user == null) throw new Exception("No user with requset id");
            var totalCo2 = 0.0f;
            var totalPoints = 0;
            foreach (ProductConsumeRequest product in request.Receipt){
                totalCo2 += product.Co2PerKg * product.QuantityKg;
                totalPoints += Convert.ToInt32(product.Points * product.QuantityKg);
                var userProduct = await db.UserProducts.FirstOrDefaultAsync(up => up.ProiductId == product.ProductId && up.UserId == request.UserID, cancellationToken);
                if (userProduct != null)
                    userProduct.QuantityKg += product.QuantityKg;
                else
                {
                    userProduct = new UserProduct { UserId = request.UserID, ProiductId = product.ProductId, QuantityKg = product.QuantityKg };
                    db.UserProducts.Add(userProduct);
                }
            }
            await db.SaveChangesAsync();

            var points = user.Points;
            user.Points = 0;
            user.Co2Total += totalCo2;
            user.Co2ThisMonth += totalCo2;
            user.Points += totalPoints;
            return totalPoints;
        }
    }
    public class ProductConsumeRequest
    {
        public int ProductId { get; set; }
        public int Points { get; set; }
        public float Co2PerKg { get; set; }
        public float QuantityKg { get; set; }
    }
    public class UserConsumePointsRequst
    {
        public int UserID { get;set; }
        public List<ProductConsumeRequest> Receipt { get; set; }
    }
}
