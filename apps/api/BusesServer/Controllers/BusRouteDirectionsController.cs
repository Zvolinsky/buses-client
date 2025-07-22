using BusesServer.Data.Models;
using BusesServer.Data.Services;
using BusesServer.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BusesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusRouteDirectionsController : ControllerBase
    {
        public BusRouteDirectionsService _busRouteDirectionsService;

        public BusRouteDirectionsController(BusRouteDirectionsService busRouteDirectionsService)
        {
            _busRouteDirectionsService = busRouteDirectionsService;
        }

        [HttpPost("add-bus-route-direction")]
        public IActionResult AddBusRouteDirection([FromBody] BusRouteDirectionDTO busRouteDirection)
        {
            try
            {
                _busRouteDirectionsService.AddBusRouteDirection(busRouteDirection);
                return Created(nameof(AddBusRouteDirection), "Utworzono");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-all-bus-route-directions")]
        public IActionResult GetAllBusRouteDirections()
        {
            var allBusRouteDirections = _busRouteDirectionsService.GetAllBusRouteDirections();
            return Ok(allBusRouteDirections);
        }

        [HttpGet("get-bus-route-direction-by-busid/{busId}")]
        public IActionResult GetBusRouteDirectionById(int busId)
        {
            try
            {
                var busRoute = _busRouteDirectionsService.GetBusRouteDirectionsByBusId(busId);
                return Ok(busRoute);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        
        [HttpPut("update-bus-route-direction/{id}")]
        public IActionResult UpdateBusRouteDirection([FromBody] BusRouteDirectionDTO busRouteDirection, int id)
        {
            _busRouteDirectionsService.UpdateBusRouteDirection(busRouteDirection, id);
            return Ok();
        }

        [HttpDelete("delete-bus-route-direction/{id}")]
        public IActionResult DeleteBusRouteDirection(int id)
        {
            _busRouteDirectionsService.DeleteBusRouteDirection(id);
            return Ok();
        }
    }
}
