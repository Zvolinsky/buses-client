using BusesServer.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using BusesServer.Data.Enums;

namespace BusesServer.DTOs
{
    public class BusRouteDTO
    {
        public int BusRouteDirectionId { get; set; }
        public Data.Enums.DayOfWeek DayOfWeek { get; set; }
        public List<RouteInfo>? RouteInfo { get; set; }
    }
}
