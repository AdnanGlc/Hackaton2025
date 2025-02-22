using backend.Helpers.API;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Endpoints.UserEndpoints
{
    public class UserGetbadges(ApplicationDb db) : EndpointBaseAsync
        .WithRequest<string>
        .WithResult<string[]>
    {
        public override async Task<string[]> HandleAsync(string request, CancellationToken cancellationToken = default)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Id == request);
            if (user == null) throw new Exception("No user with request id");

            List<string> badges = new List<string>();
            if (user.TotalGreenProductsBought >= 5) badges.Add("Green Starter");
            if (user.TotalGreenProductsBought >= 20) badges.Add("CO2 Hunter");
            if (user.TotalGreenProductsBought >= 50) badges.Add("Nature’s Ally");

            return badges.ToArray();
        }

    }
}
