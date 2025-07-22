using BusesServer.Data.Models;
using BusesServer.Data.Services;
using BusesServer.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BusesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusRouteStopsController : ControllerBase
    {
        public BusRouteStopsService _busRouteStopsService;

        public BusRouteStopsController(BusRouteStopsService busRouteStopsService)
        {
            _busRouteStopsService = busRouteStopsService;
        }

        [HttpPost("add-bus-route-stop")]
        public IActionResult AddBusRouteStop([FromBody] BusRouteStopDTO busRouteStop)
        {
            _busRouteStopsService.AddBusRouteStop(busRouteStop);
            return Ok();
        }

        [HttpGet("get-bus-route-stops")]
        public IActionResult GetBusRouteStops(int busRouteDirectionId)
        {
            var busRouteStops = _busRouteStopsService.GetBusRouteStops(busRouteDirectionId);
            return Ok(busRouteStops);
        }


        [HttpPut("update-bus-route-stop/{id}")]
        public IActionResult UpdateBusRouteStop([FromBody] BusRouteStopDTO busRouteStop, int id)
        {
            _busRouteStopsService.UpdateBusRouteStop(busRouteStop, id);
            return Ok();
        }

        [HttpDelete("delete-bus-route-stop/{id}")]
        public IActionResult DeleteBusRouteStop(int id)
        {
            _busRouteStopsService.DeleteBusRouteStop(id);
            return Ok();
        }
    }
}
