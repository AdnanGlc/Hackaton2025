using backend.Helpers.API;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Endpoints.UserEndpoints
{
    public class GetUserData(ApplicationDb db, IHttpContextAccessor _httpContext, UserManager<User> userManager) : EndpointBaseAsync
        .WithRequest
        .WithActionResult<User>
    {
        [HttpGet]
        public async override Task<ActionResult<User>> HandleAsync(CancellationToken cancellationToken = default)
        {
            if (_httpContext.HttpContext?.User.Identity?.IsAuthenticated != true)
            {
                return Unauthorized();

            }
            var user = await userManager.GetUserAsync(_httpContext.HttpContext.User);

            if (user == null)
                return NotFound("User not found");

            return Ok(user);
        }
    }
}