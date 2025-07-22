using System.ComponentModel.DataAnnotations;

namespace BusesServer.Data.Models
{
    public class BusStop
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50), Required]
        public string Name { get; set; }
        [Required]
        public double Latitude { get; set; }
        [Required]
        public double Longitude { get; set; }
    }
}
