using BusesServer.Data.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace BusesServer.Data.Models
{
    public class Departure
    {
        [Key]
        public int Id { get; set; }

        [Required, Range(0,23)]
        public int Hour { get; set; }

        [Required, Range(0, 59)]
        public int Minute { get; set; }

        public int? BusRouteId { get; set; }
        [ForeignKey("BusRouteId")]
        public virtual BusRoute? BusRoute { get; set; }

        public int? BusId { get; set; }
        [ForeignKey("BusId")]
        public virtual Bus? Bus { get; set; }

        public int? BusStopId { get; set; }
        [ForeignKey("BusStopId")]
        public virtual BusStop? BusStop { get; set; }
    }
}
