using BusesServer.Data.Enums;
using BusesServer.Data.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusesServer.DTOs
{
    public class DepartureDTO
    {
        public int Hour { get; set; }
        public int Minute { get; set; }
        public int BusRouteId { get; set; }
        public int BusId { get; set; }

        public int BusStopId { get; set; }

        
        
    }
}
