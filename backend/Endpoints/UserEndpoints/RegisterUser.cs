using backend.Helpers.API;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Endpoints.UserEndpoints
{
    public class RegisterUser(UserManager<User> userManager, IHttpContextAccessor _httpContext) : EndpointBaseAsync
        .WithRequest<RegisterDTO>
        .WithActionResult
    {
        [HttpPost]
        [AllowAnonymous]
        public async override Task<ActionResult> HandleAsync(RegisterDTO request, CancellationToken cancellationToken = default)
        {
            // Provjeri da li već postoji korisnik s istim emailom
            if (await userManager.FindByEmailAsync(request.Email) is not null)
            {
                return BadRequest("Email already in use.");
            }

            // Napravi novog korisnika s dodatnim podacima
            var user = new User
            {
                UserName = request.UserName,
                Email = request.Email,
              
            };

            // Kreiraj korisnika u Identity bazi
            var result = await userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new { message = "User registered successfully." });
        }
    }

    public class RegisterDTO
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
