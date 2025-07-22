using Azure.Core;
using BusesServer.Data.Enums;
using BusesServer.Data.Models;
using BusesServer.DTOs;
using Microsoft.VisualBasic;
using System;
using System.Diagnostics;
using System.Diagnostics.Eventing.Reader;
using System.Net;
using System.Reflection.Metadata.Ecma335;
using System.Web.Http;

namespace BusesServer.Data.Services
{
    public class DeparturesService
    {
        private AppDbContext _context;
        public DeparturesService(AppDbContext context)
        {
            _context = context;
        }

        public void AddDeparture(DepartureDTO departure) {
            var _departure = new Departure()
            {
                Hour = departure.Hour,
                Minute = departure.Minute,
                BusRouteId = departure.BusRouteId,
                BusId = departure.BusId,
                BusStopId = departure.BusStopId,
            };
            _context.Departures.Add(_departure);
            _context.SaveChanges();
        }
        

        public List<Departure> GetDepartures(int? busId, int? busStopId, int? busRouteId, int? busRouteDirectionId, int? hour, int? minute, bool? busRoutes, bool? busRouteDirections, bool? busStops)
        {
            var departures = _context.Departures.ToList();
            if (busId > 0)
            {
                departures = departures.Where(n => n.BusId == busId).ToList();
            }
            if (busStopId > 0)
            {
                departures = departures.Where(n => n.BusStopId == busStopId).ToList();
            }
            if (busRouteId > 0)
            {
                departures = departures.Where(n => n.BusRouteId == busRouteId).ToList();
            }
            if (busRouteDirectionId > 0)
            {
                var routeData = _context.BusRoutes.ToList();
                departures = departures.Where(n => n.BusRoute.BusRouteDirectionId == busRouteDirectionId).ToList();
            }
            if (int.IsPositive((int)hour) && int.IsPositive((int)minute))
            {
                var routeData = _context.BusRoutes.ToList();

                var sameHour = departures.Where(n => n.Hour == hour && n.Minute >= minute).OrderBy(x => x.Minute).ToList();
                var laterHours = departures.Where(n => n.Hour > hour).OrderBy(x => x.Hour).ThenBy(x => x.Minute).ToList();
                var earlierHours = departures.Where(n => n.Hour < hour).OrderBy(x => x.Hour).ThenBy(x => x.Minute).ToList();
                var sameHourButEarlier = departures.Where(n => n.Hour == hour && n.Minute < minute).OrderBy(x => x.Minute).ToList();

                var today = (int)DateTime.Now.DayOfWeek;

                if (today >= 1 && today <= 4)
                {
                    sameHour = sameHour.Where(n => n.Hour == hour && n.Minute >= minute && n.BusRoute.DayOfWeek == Enums.DayOfWeek.Pnpt).OrderBy(x => x.Minute).ToList();
                    laterHours = laterHours.Where(n => n.Hour > hour && n.BusRoute.DayOfWeek == Enums.DayOfWeek.Pnpt).OrderBy(x => x.Hour).ThenBy(x => x.Minute).ToList();
                    earlierHours = earlierHours.Where(n => n.Hour < hour && n.BusRoute.DayOfWeek == Enums.DayOfWeek.Pnpt).OrderBy(x => x.Hour).ThenBy(x => x.Minute).ToList();
                    sameHourButEarlier = sameHourButEarlier.Where(n => n.Hour == hour && n.Minute < minute && n.BusRoute.DayOfWeek == Enums.DayOfWeek.Pnpt).OrderBy(x => x.Minute).ToList();
                };
                if (today == 5)
                {
                    sameHour = sameHour.Where(n => n.Hour == hour && n.Minute >= minute && n.BusRoute.DayOfWeek == Enums.DayOfWeek.Pnpt).OrderBy(x => x.Minute).ToList();
                    laterHours = laterHours.Where(n => n.Hour > hour && n.BusRoute.DayOfWeek == Enums.DayOfWeek.Pnpt).OrderBy(x => x.Hour).ThenBy(x => x.Minute).ToList();
                    earlierHours = earlierHours.Where(n => n.Hour < hour && n.BusRoute.DayOfWeek == Enums.DayOfWeek.Sobota).OrderBy(x => x.Hour).ThenBy(x => x.Minute).ToList();
                    sameHourButEarlier = sameHourButEarlier.Where(n => n.Hour == hour && n.Minute < minute && n.BusRoute.DayOfWeek == Enums.DayOfWeek.Sobota).OrderBy(x => x.Minute).ToList();
                };
                if (today == 6)
                {
                    sameHour = sameHour.Where(n => n.Hour == hour && n.Minute >= minute && n.BusRoute.DayOfWeek == Enums.DayOfWeek.Sobota).OrderBy(x => x.Minute).ToList();
                    laterHours = laterHours.Where(n => n.Hour > hour && n.BusRoute.DayOfWeek == Enums.DayOfWeek.Sobota).OrderBy(x => x.Hour).ThenBy(x => x.Minute).ToList();
                    earlierHours = earlierHours.Where(n => n.Hour < hour && n.BusRoute.DayOfWeek == Enums.DayOfWeek.Swieta).OrderBy(x => x.Hour).ThenBy(x => x.Minute).ToList();
                    sameHourButEarlier = sameHourButEarlier.Where(n => n.Hour == hour && n.Minute < minute && n.BusRoute.DayOfWeek == Enums.DayOfWeek.Swieta).OrderBy(x => x.Minute).ToList();
                };
                if (today == 7)
                {
                    sameHour = sameHour.Where(n => n.Hour == hour && n.Minute >= minute && n.BusRoute.DayOfWeek == Enums.DayOfWeek.Swieta).OrderBy(x => x.Minute).ToList();
                    laterHours = laterHours.Where(n => n.Hour > hour && n.BusRoute.DayOfWeek == Enums.DayOfWeek.Swieta).OrderBy(x => x.Hour).ThenBy(x => x.Minute).ToList();
                    earlierHours = earlierHours.Where(n => n.Hour < hour && n.BusRoute.DayOfWeek == Enums.DayOfWeek.Pnpt).OrderBy(x => x.Hour).ThenBy(x => x.Minute).ToList();
                    sameHourButEarlier = sameHourButEarlier.Where(n => n.Hour == hour && n.Minute < minute && n.BusRoute.DayOfWeek == Enums.DayOfWeek.Pnpt).OrderBy(x => x.Minute).ToList();
                };
                

                departures = sameHour.Concat(laterHours).
                    Concat(earlierHours).
                    Concat(sameHourButEarlier).
                    ToList();
            }

            if ((bool)busRoutes)
            {
            var routeData = _context.BusRoutes.ToList();
             var result = departures.Join(routeData, d => d.BusRouteId, r => r.Id, (d, r) => new
            {
                Id = d.Id,
                Hour = d.Hour,
                Minute = d.Minute,
                BusRouteId = d.BusRouteId,
                BusStopId = d.BusStopId,
                BusId = d.BusId,
                DayOfWeek = r.DayOfWeek,
                RouteInfo = r.RouteInfo
            }) ;
            }

            if ((bool)busRouteDirections)
            {
                var routeData = _context.BusRoutes.ToList();
                var directionData = _context.BusRouteDirections.ToList();
                var busData = _context.Buses.ToList();

                var result = departures.Join(routeData, d => d.BusRouteId, r => r.Id, (d, r) => new
                {
                    Id = d.Id,
                    Hour = d.Hour,
                    Minute = d.Minute,
                    BusRouteId = d.BusRouteId,
                    BusStopId = d.BusStopId,
                    BusId = d.BusId,
                    DayOfWeek = r.DayOfWeek,
                    RouteInfo = r.RouteInfo,
                    BusRouteDirectionId = r.BusRouteDirectionId
                }).Join(directionData, r => r.BusRouteDirectionId, d => d.Id, (r, d) => new
                {
                    Id = r.Id,
                    Hour = r.Hour,
                    Minute = r.Minute,
                    BusRouteId = r.BusRouteId,
                    BusStopId = r.BusStopId,
                    BusId = r.BusId,
                    DayOfWeek = r.DayOfWeek,
                    RouteInfo = r.RouteInfo,
                    BusRouteDirectionId = r.BusRouteDirectionId,
                    BusRouteDirectionName = d.Name
                }).Join(busData, d => d.BusId, b => b.Id, (d,b) => new
                {
                    Id = d.Id,
                    Hour = d.Hour,
                    Minute = d.Minute,
                    DayOfWeek = d.DayOfWeek,
                    RouteInfo = d.RouteInfo,
                    BusRouteDirectionName = d.BusRouteDirectionName,
                    BusNumber = b.Number
                });
            }

            if ((bool)busStops)
            {
                var busStopData = _context.BusStops.ToList();
                var result = departures.Join(busStopData, d => d.BusStopId, b => b.Id, (d, b) => new
                {
                    Id = d.Id,
                    Hour = d.Hour,
                    Minute = d.Minute,
                    busStopName = b.Name
                });
            }

            return departures;
        }

        public Departure? GetDepartureById (int id)
        {
            var departure = _context.Departures.FirstOrDefault(n => n.Id == id);
            return departure;
        }

        public void UpdateDeparture(DepartureDTO departure, int id)
        {
            var _departure = _context.Departures.FirstOrDefault(n => n.Id == id);
            if (_departure != null)
            {
                _departure.Hour = departure.Hour;
                _departure.Minute = departure.Minute;
                _departure.BusRouteId = departure.BusRouteId;
                _departure.BusId = departure.BusId;
                _departure.BusStopId = departure.BusStopId;

                _context.SaveChanges(); 
            } else
            {
                throw new Exception("Nie znaleziono");
            }
            
        }

        public void DeleteDeparture(int id)
        {
            var _departure = _context.Departures.FirstOrDefault(n => n.Id == id);
            if (_departure != null)
            {
                _context.Departures.Remove(_departure);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Nie znaleziono");
            }
        }

    }
}
