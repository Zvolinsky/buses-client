using Azure.Core;
using BusesServer.Data.Models;
using BusesServer.DTOs;
using Microsoft.VisualBasic;
using System.Diagnostics.Eventing.Reader;
using System.Net;
using System.Web.Http;

namespace BusesServer.Data.Services
{
    public class BusRouteStopsService
    {
        private AppDbContext _context;
        public BusRouteStopsService(AppDbContext context)
        {
            _context = context;
        }

        public BusRouteStop AddBusRouteStop(BusRouteStopDTO busRouteStop) {
            var _busRouteStop = new BusRouteStop()
            {
                BusStopId = busRouteStop.BusStopId,
                BusRouteDirectionId = busRouteStop.BusRouteDirectionId,
                Order = busRouteStop.Order,

            };
            _context.BusRouteStops.Add(_busRouteStop);
            _context.SaveChanges();

            return _busRouteStop;
        }
        
        public List<BusRouteStop> GetBusRouteStops(int busRouteDirectionId)
        {
            var busRouteStops = _context.BusRouteStops.ToList();
            if (busRouteDirectionId > 0)
            {
                busRouteStops = busRouteStops.Where(n => n.BusRouteDirectionId == busRouteDirectionId).ToList();
                var busStops = _context.BusStops.ToList();
                var result = busRouteStops.Join(busStops, brs => brs.BusStopId, bs => bs.Id, (brs, bs) => new
                {
                    Id = brs.Id,
                    BusRouteDirectionId = brs.BusRouteDirectionId,
                    BusStopId = brs.BusStopId,
                    Order = brs.Order,
                    BusStopName = bs.Name
                });
            }


            return busRouteStops;
        }

        public void UpdateBusRouteStop(BusRouteStopDTO busRouteStop, int id)
        {
            var _busRouteStop = _context.BusRouteStops.FirstOrDefault(n => n.Id == id);
            if (_busRouteStop != null)
            {
                _busRouteStop.BusStopId = busRouteStop.BusStopId;
                _busRouteStop.BusRouteDirectionId = busRouteStop.BusRouteDirectionId;
                _busRouteStop.Order = busRouteStop.Order;

                _context.SaveChanges(); 
            } else
            {
                throw new Exception("Nie znaleziono");
            }
            
        }

        public void DeleteBusRouteStop(int id)
        {
            var _busRouteStop = _context.BusRouteStops.FirstOrDefault(n => n.Id == id);
            if (_busRouteStop != null)
            {
                _context.BusRouteStops.Remove(_busRouteStop);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Nie znaleziono");
            }
        }
    }
}
