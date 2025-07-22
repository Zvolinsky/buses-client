using System.ComponentModel.DataAnnotations;

namespace BusesServer.Data.Models
{
    public class Bus
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(5),Required]
        public string Number { get; set; }
    }
}
