using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User : IdentityUser<int>
    {
        public string Role { get; set; } 
        // public string UserName { get; set; }     
        public UserAddress Address { get; set; }
        public UserPortofolio Portofolio { get; set; }
        
        // one to many
        public ICollection<Appointment> Appointments { get; set; }

        // one to many
        public ICollection<Booking> Bookings { get; set; }
    }
}