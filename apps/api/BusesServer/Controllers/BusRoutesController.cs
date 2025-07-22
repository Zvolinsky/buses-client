using BusesServer.Data.Models;
using BusesServer.Data.Services;
using BusesServer.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BusesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusRoutesController : ControllerBase
    {
        public BusRoutesService _busRoutesService;

        public BusRoutesController(BusRoutesService busRoutesService)
        {
            _busRoutesService = busRoutesService;
        }

        [HttpPost("add-bus-route")]
        public IActionResult AddBusRoute([FromBody]BusRouteDTO busRoute)
        {
            try
            {
                _busRoutesService.AddBusRoute(busRoute);
                return Created(nameof(AddBusRoute), "Utworzono");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpGet("get-bus-routes")]
        public IActionResult GetBusRoutes()
        {
            var busRoutes = _busRoutesService.GetBusRoutes();
            return Ok(busRoutes);
        }

        [HttpGet("get-bus-route-by-id/{id}")]
        public IActionResult GetBusRouteById(int id)
        {
            try
            {
                var busRoute = _busRoutesService.GetBusRouteById(id);
                return Ok(busRoute);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }

        }

        [HttpPut("update-bus-route/{id}")]
        public IActionResult UpdateBusRoute([FromBody]BusRouteDTO busRoute ,int id)
        {
            _busRoutesService.UpdateBusRoute(busRoute, id);
            return Ok();
        }

        [HttpDelete("delete-bus-route/{id}")]
        public IActionResult DeleteBusRoute(int id)
        {
            try
            {
            _busRoutesService.DeleteBusRoute(id);
            return Ok();
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
    }
}

