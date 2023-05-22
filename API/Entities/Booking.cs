namespace API.Entities
{
    public class Booking
    {
        public int Id { get; set; }
        public string Day { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public int PartnerId { get; set; }
        public string PartnerName { get; set; }

        // one to many
        public User User { get; set; }
        public int UserId { get; set; }
    }
}