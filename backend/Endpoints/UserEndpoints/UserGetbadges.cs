using backend.Helpers.API;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints.UserEndpoints
{
    public class UserGetbadges(ApplicationDb db) : EndpointBaseAsync
        .WithRequest<string>
        .WithResult<Badge[]>
    {
        public override async Task<Badge[]> HandleAsync(string request, CancellationToken cancellationToken = default)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Id == request);
            if (user == null) throw new Exception("Nop user with request id");
            throw new NotImplementedException();
        }

    }
}
