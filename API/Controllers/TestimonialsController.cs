using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class TestimonialsController : BaseApiController
    {
        private readonly StoreContext _context;
        public TestimonialsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Testimonial>>> GetTestimonials()
        {
            var testimonials = await _context.Testimonials.ToListAsync();
            return Ok(testimonials);
        }
        
        [HttpPost]
        public async Task<ActionResult<Testimonial>> AddTestimonial(Testimonial testimonial)
        {
            _context.Testimonials.Add(testimonial);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}