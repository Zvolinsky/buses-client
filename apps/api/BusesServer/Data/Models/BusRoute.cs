using BusesServer.Data.Enums;
using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace BusesServer.Data.Models
{
    public class BusRoute
    {
        [Key]
        public int Id { get; set; }
        public int? BusRouteDirectionId { get; set; }
        [ForeignKey("BusRouteDirectionId")]
        public virtual BusRouteDirection? BusRouteDirection { get; set; }
        public Enums.DayOfWeek DayOfWeek { get; set; }
        public List<RouteInfo>? RouteInfo { get; set; }

    }
}
