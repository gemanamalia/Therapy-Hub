using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BookingController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;
        public BookingController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet("{id}", Name="userBookings")]
        public async Task<List<Booking>> GetUserBookings(int id)
        {

            var bookings =  await _context.Bookings
                .Where(x => x.UserId == id)
                .ToListAsync();
            
            return bookings;
        }

        [Authorize]
        [HttpPost("saveUserBooking")]
        public async Task<ActionResult<Appointment>> SaveUserBooking(string day, string start, string end, int doctorId, string doctorName)
        {
            var user = await _context.Users
                        .Include(a => a.Bookings)
                        .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

            if (user == null)
            {
                return NotFound();
            }

            var booking = new Booking
            {
                Day = day,
                Start = start,
                End = end,
                PartnerId = doctorId,
                PartnerName = doctorName,
                User = user
            };

            user.Bookings.Add(booking);

            var result = await _context.SaveChangesAsync() > 0;

            return Ok();
        }

        [Authorize]
        [HttpPost("saveDoctorBooking")]
        public async Task<ActionResult<Appointment>> saveDoctorBooking(string username, string day, string start, string end, int partnerId, string partnerName)
        {
            // var user = await _userManager.FindByNameAsync(username);
            
             var user = await _context.Users
                        .Include(a => a.Bookings)
                        .FirstOrDefaultAsync(x => x.UserName == username);

            if (user == null)
            {
                return NotFound();
            }

            var booking = new Booking
            {
                Day = day,
                Start = start,
                End = end,
                PartnerId = partnerId,
                PartnerName = partnerName,
                User = user
            };

            user.Bookings.Add(booking);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Failed to add booking");
            }
        }

    }
}