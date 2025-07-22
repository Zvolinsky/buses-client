using BusesServer.Data.Models;
using BusesServer.Data.Services;
using BusesServer.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BusesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusesController : ControllerBase
    {
        public BusesService _busesService;

        public BusesController(BusesService busesService)
        {
            _busesService = busesService;
        }

        [HttpPost("add-bus")]
        public IActionResult AddBus([FromBody]BusDTO bus)
        {
            try
            {
                _busesService.AddBus(bus);
                return Created(nameof(AddBus), "Utworzono");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpGet("get-all-buses")]
        public IActionResult GetAllBuses()
        {
            try
            {
                var allBuses = _busesService.GetAllBuses();
            return Ok(allBuses);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("get-bus-by-id/{id}")]
        public IActionResult GetBusById(int id)
        {
           

            try
            {
                var bus = _busesService.GetBusById(id);
                return Ok(bus);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }

        }

        [HttpPut("update-bus/{id}")]
        public IActionResult UpdateBus([FromBody]BusDTO bus ,int id)
        {
            _busesService.UpdateBus(bus, id);
            return Ok();
        }

        [HttpDelete("delete-bus/{id}")]
        public IActionResult DeleteBus(int id)
        {
            try
            {
_busesService.DeleteBus(id);
            return Ok();
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
    }
}

