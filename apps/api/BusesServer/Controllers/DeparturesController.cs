using BusesServer.Data.Models;
using BusesServer.Data.Services;
using BusesServer.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BusesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeparturesController : ControllerBase
    {
        public DeparturesService _departuresService;

        public DeparturesController(DeparturesService departuresService)
        {
            _departuresService = departuresService;
        }

        [HttpPost("add-departure")]
        public IActionResult AddDeparture([FromBody] DepartureDTO departure)
        {
            _departuresService.AddDeparture(departure);
            return Ok();
        }


        [HttpGet("get-departures")]
        public IActionResult GetDepartures(int busId, int busStopId, int busRouteId, int busRouteDirectionId, int hour, int minute, bool busRoutes, bool busRouteDirections, bool busStops)
        {
            var departure = _departuresService.GetDepartures(busId, busStopId, busRouteId, busRouteDirectionId, hour, minute, busRoutes, busRouteDirections, busStops);
            return Ok(departure);
        }
       

        [HttpGet("get-departure-by-id/{id}")]
        public IActionResult GetDepartureById(int id)
        {
            var departure = _departuresService.GetDepartureById(id);
            return Ok(departure);
        }

        [HttpPut("update-departure/{id}")]
        public IActionResult UpdateDeparture([FromBody] DepartureDTO departure, int id)
        {
            _departuresService.UpdateDeparture(departure, id);
            return Ok();
        }

        [HttpDelete("delete-departure/{id}")]
        public IActionResult DeleteDeparture(int id)
        {
            _departuresService.DeleteDeparture(id);
            return Ok();
        }
    }
}
