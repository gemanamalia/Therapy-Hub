using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class LinkContactController : BaseApiController
    {
        private readonly StoreContext _context;
        public LinkContactController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<LinkContact>>> GetLinkContacts()
        {
            var linkContacts = await _context.LinkContacts.ToListAsync();
            return Ok(linkContacts);
        }

        [HttpPost]
        public async Task<ActionResult<LinkContact>> AddLinkContact(LinkContact linkContact)
        {
            _context.LinkContacts.Add(linkContact);
            await _context.SaveChangesAsync();
            return Ok();
        }
        
    }
}