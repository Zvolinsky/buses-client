using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace BusesServer.Data.Models
{
    public class BusRouteStop
    {
        public int Id { get; set; }
        public int? BusStopId { get; set; }
        [ForeignKey("BusStopId")]
        public virtual BusStop? BusStop { get; set; }
        public int? BusRouteDirectionId { get; set; }
        [ForeignKey("BusRouteDirectionId")]
        public virtual BusRouteDirection? BusRouteDirection { get; set; }

        public int Order { get; set; }
    }
}
