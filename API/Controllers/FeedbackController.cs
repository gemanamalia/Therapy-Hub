
using API.Data;
using API.Entities;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class FeedbackController : BaseApiController
    {
        private readonly StoreContext _context;
        public FeedbackController(StoreContext context)
        { 
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Feedback>>> GetAllFeedback() 
        {
            var feedbacks =  await _context.Feedbacks.ToListAsync();

            return Ok(feedbacks);
        }

        [HttpGet("{id}", Name="feedbackByDoctorId")]
        public async Task<ActionResult<List<Feedback>>> GetDoctorsFeedback(int id) 
        {
            var feedbacks =  await _context.Feedbacks
                .Where(x => x.DoctorId == id)
                .ToListAsync();

            return Ok(feedbacks);
        }

        [HttpPost]
        public async Task<ActionResult<Feedback>> AddFeedback(string text, int doctorId)
        {
            var feedback = new Feedback
            {
                Text = text,
                DoctorId = doctorId
            };
            
            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}