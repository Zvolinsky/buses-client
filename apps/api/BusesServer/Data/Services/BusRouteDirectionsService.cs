using Azure.Core;
using BusesServer.Data.Models;
using BusesServer.DTOs;
using Microsoft.VisualBasic;
using System.Diagnostics.Eventing.Reader;
using System.Net;
using System.Web.Http;

namespace BusesServer.Data.Services
{
    public class BusRouteDirectionsService
    {
        private AppDbContext _context;
        public BusRouteDirectionsService(AppDbContext context)
        {
            _context = context;
        }

        public void AddBusRouteDirection(BusRouteDirectionDTO busRouteDirection) {
            var _busRouteDirection = new BusRouteDirection()
            {
                Name = busRouteDirection.Name,
                BusId = busRouteDirection.BusId,
            };
            _context.BusRouteDirections.Add(_busRouteDirection);
            _context.SaveChanges();
        }
        
        public List<BusRouteDirection> GetAllBusRouteDirections()
        {
            var allBusRouteDirections = _context.BusRouteDirections.ToList();
            return allBusRouteDirections;
        }

         public List<BusRouteDirection> GetBusRouteDirectionsByBusId(int busId)
        {
            var busRouteDirection = _context.BusRouteDirections.Where(n => n.BusId == busId).ToList();
            return busRouteDirection;
        }
        
        public void UpdateBusRouteDirection(BusRouteDirectionDTO busRouteDirection, int id)
        {
            var _busRouteDirection = _context.BusRouteDirections.FirstOrDefault(n => n.Id == id);
            if (_busRouteDirection != null)
            {
                _busRouteDirection.Name = busRouteDirection.Name;
                _busRouteDirection.BusId = busRouteDirection.BusId;

                _context.SaveChanges(); 
            } else
            {
                throw new Exception("Nie znaleziono");
            }
            
        }

        public void DeleteBusRouteDirection(int id)
        {
            var _busRouteDirection = _context.BusRouteDirections.FirstOrDefault(n => n.Id == id);
            if (_busRouteDirection != null)
            {
                _context.BusRouteDirections.Remove(_busRouteDirection);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Nie znaleziono");
            }
        }
    }
}
