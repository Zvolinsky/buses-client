using Azure.Core;
using BusesServer.Data.Models;
using BusesServer.DTOs;
using Microsoft.VisualBasic;
using System.Diagnostics.Eventing.Reader;
using System.Net;
using System.Web.Http;

namespace BusesServer.Data.Services
{
    public class BusStopsService
    {
        private AppDbContext _context;
        public BusStopsService(AppDbContext context)
        {
            _context = context;
        }

        public void AddBusStop(BusStopDTO busStop) {
            if (!_context.BusStops.Any(n=>n.Name == busStop.Name))
            {
                var _busStop = new BusStop()
                {
                    Name = busStop.Name,
                };
                _context.BusStops.Add(_busStop);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Nazwa już istnieje.");
            }
            
        }
        
        public List<BusStop> GetAllBusStops()
        {
            var allBusStops = _context.BusStops.OrderBy(n => n.Name).ToList();
            return allBusStops;
        }

        public BusStop GetBusStopById (int id)
        {
            var busStop = _context.BusStops.FirstOrDefault(n => n.Id == id);
            return busStop;
        }

        public void UpdateBusStop(BusStopDTO busStop, int id)
        {
            var _busStop = _context.BusStops.FirstOrDefault(n => n.Id == id);
            if (_busStop != null)
            {
                _busStop.Name = busStop.Name;
                _context.SaveChanges(); 
            } else
            {
                throw new Exception("Nie znaleziono");
            }
            
        }

        public void DeleteBusStop(int id)
        {
            var _busStop = _context.BusStops.FirstOrDefault(n => n.Id == id);
            if (_busStop != null)
            {
                _context.BusStops.Remove(_busStop);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Nie znaleziono");
            }
        }
    }
}
