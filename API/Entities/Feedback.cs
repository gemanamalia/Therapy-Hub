namespace API.Entities
{
    public class Feedback
    {
        public int Id { get; set; }   
        public int  DoctorId { get; set; }
        public string Text { get; set; }
       
    }
}