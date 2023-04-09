using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class PhoneContactController : BaseApiController
    {
        private readonly StoreContext _context;
        public PhoneContactController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<PhoneContact>>> GetPhoneContacts()
        {
            var phoneContacts = await _context.PhoneContacts.ToListAsync();
            return Ok(phoneContacts);
        }

        [HttpPost]
        public async Task<ActionResult<PhoneContact>> AddPhoneContact(PhoneContact phoneContact)
        {
            _context.PhoneContacts.Add(phoneContact);
            await _context.SaveChangesAsync();
            // return CreatedAtAction(nameof(GetPhoneContacts), new { id = phoneContact.Id }, phoneContact);
            return Ok();
        }

    }
}