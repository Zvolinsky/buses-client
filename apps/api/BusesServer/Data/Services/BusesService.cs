using Azure.Core;
using BusesServer.Data.Models;
using BusesServer.DTOs;
using Microsoft.VisualBasic;
using System.Diagnostics.Eventing.Reader;
using System.Net;
using System.Web.Http;

namespace BusesServer.Data.Services
{
    public class BusesService
    {
        private AppDbContext _context;
        public BusesService(AppDbContext context)
        {
            _context = context;
        }


        public Bus AddBus(BusDTO bus) {
            var _bus = new Bus()
            {
                Number = bus.Number,
            };
            _context.Buses.Add(_bus);
            _context.SaveChanges();

            return _bus;
        }
        
        public List<Bus> GetAllBuses()
        {
            var allBuses = _context.Buses.OrderBy(b => b.Number).ToList();
            return allBuses;
        }

        public Bus GetBusById (int id)
        {
            var bus = _context.Buses.FirstOrDefault(n => n.Id == id);
            return bus;
        }

        public void UpdateBus(BusDTO bus, int id)
        {
            var _bus = _context.Buses.FirstOrDefault(n => n.Id == id);
            if (_bus != null)
            {
                _bus.Number = bus.Number;
                _context.SaveChanges(); 
            } else
            {
                throw new Exception("Nie znaleziono");
            }
            
        }

        public void DeleteBus(int id)
        {
            var _bus = _context.Buses.FirstOrDefault(n => n.Id == id);
            if (_bus != null)
            {
                _context.Buses.Remove(_bus);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Nie znaleziono");
            }
        }
    }
}
