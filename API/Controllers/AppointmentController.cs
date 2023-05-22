using API.Data;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AppointmentController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;
        public AppointmentController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        
        [Authorize]
        [HttpGet("{id}", Name="userAppointments")]
        public async Task<List<Appointment>> GetUserAppointments(int id)
        {

            var appointments =  await _context.Appointments
                .Where(x => x.UserId == id)
                .ToListAsync();
            
            return appointments;
        }

        [Authorize]
        [HttpPost("saveUserAppointment")]
        public async Task<ActionResult<Appointment>> SaveUserAppointment(string day, string start, string end, int doctorId, string doctorName)
        {
            var user = await _context.Users
                        .Include(a => a.Appointments)
                        .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

            if (user == null)
            {
                return NotFound();
            }

            var appointment = new Appointment
            {
                Day = day,
                Start = start,
                End = end,
                DoctorId = doctorId,
                DoctorName = doctorName,
                User = user
            };

            user.Appointments.Add(appointment);

            var result = await _context.SaveChangesAsync() > 0;

            return Ok();
        }


        [Authorize]
        [HttpDelete("deleteUserAppointment")]
        public async Task<ActionResult> DeleteUserAppointment(int id, string username)
        {
            var user = await _context.Users
                .Include(a => a.Appointments)
                .FirstOrDefaultAsync(x => x.UserName == username);

            if (user == null)
            {
                return NotFound();
            }

            var appointment = user.Appointments.FirstOrDefault(a => a.Id == id);

            if (appointment == null)
            {
                return NotFound();
            }

            user.Appointments.Remove(appointment);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result)
            {
                return BadRequest("Failed to delete appointment");
            }

            return NoContent();
        }

    }
}