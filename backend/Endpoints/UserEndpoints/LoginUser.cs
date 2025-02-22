using backend.Helpers.API;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Endpoints.UserEndpoints
{
    [AllowAnonymous]

    public class LoginUser(SignInManager<User> signInManager) : EndpointBaseAsync
        .WithRequest<LoginDTO>
        .WithActionResult
    {
        [HttpPost]

        public async override Task<ActionResult> HandleAsync(LoginDTO request, CancellationToken cancellationToken = default)
        {
            var user = await signInManager.UserManager.FindByEmailAsync(request.Email);
            if (user == null) return Unauthorized();

            var result = await signInManager.PasswordSignInAsync(user, request.Password, false, false);
            if (!result.Succeeded) return Unauthorized();

            return Ok(new { message = "Login successful." });
        }
    }

    public class LoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }
}
