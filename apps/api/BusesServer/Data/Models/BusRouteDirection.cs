using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace BusesServer.Data.Models
{
    public class BusRouteDirection
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        
        public int? BusId { get; set; }
        [ForeignKey("BusId")]
        public virtual Bus? Bus { get; set; }
    }
}
