using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User : IdentityUser<int>
    {
        public UserAddress Address { get; set; }
        public string Role { get; set; }        

        public UserPortofolio Portofolio { get; set; }
        // public <List<FreeSpot> FreeSpots { get; set; } = new (); 
    }
}