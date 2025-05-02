using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PunkteSystem.EFCore;
using PunkteSystem.Model;
using BCrypt.Net;

namespace PunkteSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(SchwimmerContext context) : ControllerBase
    {
        private readonly SchwimmerContext context = context;

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var exists = await context.Users.AnyAsync(u => u.Benutzername == user.Benutzername);
            if (exists)
                return BadRequest("Benutzer existiert bereits");

            user.PasswortHash = BCrypt.Net.BCrypt.HashPassword(user.PasswortHash);
            context.Users.Add(user);
            await context.SaveChangesAsync();

            return Ok("Registrierung erfolgreich");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User loginData)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Benutzername == loginData.Benutzername);
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginData.PasswortHash, user.PasswortHash))
                return Unauthorized("Login fehlgeschlagen");

            return Ok("Login erfolgreich");
        }
    }
}
