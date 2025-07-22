using BusesServer.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace BusesServer.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {
            
        }

        public DbSet<Bus> Buses { get; set; }
        public DbSet<BusStop> BusStops { get; set; }
        public DbSet<BusRouteDirection> BusRouteDirections { get; set; }
        public DbSet<BusRoute> BusRoutes { get; set; }
        public DbSet<BusRouteStop> BusRouteStops { get; set; }
        public DbSet<Departure> Departures { get; set; }
    }
}
