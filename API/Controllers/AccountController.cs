using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;
        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();
            
            var userBasket = await RetrieveBasket(loginDto.UserName);
            var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

            if (anonBasket != null)
            {
                if (userBasket != null) _context.Baskets.Remove(userBasket);
                anonBasket.BuyerId = user.UserName;
                Response.Cookies.Delete("buyerId");
                await _context.SaveChangesAsync();
            }

            return new UserDto 
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = anonBasket != null ? anonBasket.MapBasketToDto() : userBasket?.MapBasketToDto()
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User{UserName = registerDto.UserName, Email = registerDto.Email};
        
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        } 

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var userBasket = await RetrieveBasket(User.Identity.Name);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = userBasket?.MapBasketToDto(),
                Role = user.Role,
                UserName = user.UserName
            };
        }

        [Authorize]
        [HttpGet("userId")]
        public async Task<ActionResult<int>> GetUserId()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return user.Id;
        }

        [Authorize]
        [HttpGet("userRole")]
        public async Task<ActionResult<string>> GetUserRole()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return user.Role;
        }

        [Authorize]
        [HttpGet("savedAddress")]
        public async Task<ActionResult<UserAddress>> GetSavedAddress()
        {
            return await _userManager.Users
                .Where(x => x.UserName == User.Identity.Name)
                .Select(user => user.Address)
                .FirstOrDefaultAsync();
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }
         
        [Authorize]
        [HttpGet("doctors")]
        public async Task<ActionResult<List<User>>> GetAllDoctors()
        {
            var doctors = await  _context.Users
                .Where(x => x.Role == "doctor")
                .ToListAsync();

            return doctors;
        }

        [Authorize]
        [HttpGet("portofolio")]
        public async Task<ActionResult<UserPortofolio>> GetPortofolio()
        {
            return await _userManager.Users
                .Where(x => x.UserName == User.Identity.Name)
                .Select(user => user.Portofolio)
                .FirstOrDefaultAsync();
        }
        [Authorize]
        

        [Authorize]
        [HttpGet("{id}", Name="portofolioByUserId")]
        public async Task<ActionResult<UserPortofolio>> GetPortofolioByUserId(int id)
        {
            return await _userManager.Users
                .Where(x => x.Id == id)
                .Select(user => user.Portofolio)
                .FirstOrDefaultAsync();
        }

        [Authorize]
        [HttpPost("savePortofolio")]
        public async Task<ActionResult> SavePortofolio(Portofolio portof)
        {
            var user = await _context.Users
                    .Include(a => a.Portofolio)
                    .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

            var portofolio = new UserPortofolio
                {
                    ContactAddress = portof.ContactAddress,
                    Description = portof.Description,
                    Phone = portof.Phone,
                    PictureUrl = portof.PictureUrl,
                    FullName = portof.FullName
                };
            user.Portofolio = portofolio;
            
            var result = await _context.SaveChangesAsync() > 0;

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            
            if (user == null) return NotFound();
            
            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                
                return BadRequest();
            }

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("users")]
        public async Task<ActionResult<List<UserDto>>> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var userDtos = users.Select(user => new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                UserName = user.UserName,
                Role = user.Role
            }).ToList();

            return userDtos;
        }



        
    }
}