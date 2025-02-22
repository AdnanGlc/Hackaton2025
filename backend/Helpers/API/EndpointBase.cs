using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Helpers.API
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public abstract class EndpointBase : ControllerBase
    {
    }
}
