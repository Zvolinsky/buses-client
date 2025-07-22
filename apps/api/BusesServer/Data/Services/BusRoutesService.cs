using Azure.Core;
using BusesServer.Data.Models;
using BusesServer.DTOs;
using Microsoft.VisualBasic;
using System.Diagnostics.Eventing.Reader;
using System.Net;
using System.Web.Http;

namespace BusesServer.Data.Services
{
    public class BusRoutesService
    {
        private AppDbContext _context;
        public BusRoutesService(AppDbContext context)
        {
            _context = context;
        }

        public BusRoute AddBusRoute(BusRouteDTO busRoute) {
            var _busRoute = new BusRoute()
            {
                BusRouteDirectionId = busRoute.BusRouteDirectionId,
                DayOfWeek = busRoute.DayOfWeek,
                RouteInfo = busRoute.RouteInfo,

            };
            _context.BusRoutes.Add(_busRoute);
            _context.SaveChanges();

            return _busRoute;
        }
        
        public List<BusRoute> GetBusRoutes()
        {
            var busRoutes = _context.BusRoutes.ToList();
            return busRoutes;
        }

        public BusRoute? GetBusRouteById (int id)
        {
            var busRoute = _context.BusRoutes.FirstOrDefault(n => n.Id == id);
            return busRoute;
        }

        public void UpdateBusRoute(BusRouteDTO busRoute, int id)
        {
            var _busRoute = _context.BusRoutes.FirstOrDefault(n => n.Id == id);
            if (_busRoute != null)
            {
                _busRoute.BusRouteDirectionId = busRoute.BusRouteDirectionId;
                _busRoute.DayOfWeek = busRoute.DayOfWeek;
                _busRoute.RouteInfo = busRoute.RouteInfo;

                _context.SaveChanges(); 
            } else
            {
                throw new Exception("Nie znaleziono");
            }
            
        }

        public void DeleteBusRoute(int id)
        {
            var _busRoute = _context.BusRoutes.FirstOrDefault(n => n.Id == id);
            if (_busRoute != null)
            {
                _context.BusRoutes.Remove(_busRoute);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Nie znaleziono");
            }
        }
    }
}
