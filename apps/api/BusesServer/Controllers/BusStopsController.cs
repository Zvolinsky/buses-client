using BusesServer.Data.Models;
using BusesServer.Data.Services;
using BusesServer.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BusesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusStopsController : ControllerBase
    {
        public BusStopsService _busStopsService;

        public BusStopsController(BusStopsService busStopsService)
        {
            _busStopsService = busStopsService;
        }

        [HttpPost("add-bus-stop")]
        public IActionResult AddBusStop([FromBody] BusStopDTO busStop)
        {
            
            try
            {
                _busStopsService.AddBusStop(busStop);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-all-bus-stops")]
        public IActionResult GetAllBusStops()
        {
            var allBusStops = _busStopsService.GetAllBusStops();
            return Ok(allBusStops);
        }

        [HttpGet("get-bus-stop-by-id/{id}")]
        public IActionResult GetBusStopById(int id)
        {
            var busStop = _busStopsService.GetBusStopById(id);
            return Ok(busStop);
        }

        [HttpPut("update-bus-stop/{id}")]
        public IActionResult UpdateBusStop([FromBody] BusStopDTO busStop, int id)
        {
            _busStopsService.UpdateBusStop(busStop, id);
            return Ok();
        }

        [HttpDelete("delete-bus-stop/{id}")]
        public IActionResult DeleteBusStop(int id)
        {
            _busStopsService.DeleteBusStop(id);
            return Ok();
        }
    }
}
