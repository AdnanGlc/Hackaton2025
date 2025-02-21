using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Helpers.API
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public abstract class EndpointBase : ControllerBase
    {
    }
}
