namespace API.Entities
{
    public class Appointment
    {
        public int Id { get; set; }
        public string Day { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public int DoctorId { get; set; }
        public string DoctorName { get; set; }

        // one to many
        public User User { get; set; }
        public int UserId { get; set; }
    }
}