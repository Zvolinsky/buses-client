using BusesServer.Data;
using BusesServer.Data.Models;
using BusesServer.Data.Services;
using Microsoft.EntityFrameworkCore;

namespace BusesServer.Tests
{
    public class BusRouteDirectionsTest
    {
         private static DbContextOptions<AppDbContext> dbContextOptions = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "BusesDbTest")
            .Options;

#pragma warning disable NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method
        private AppDbContext context;
#pragma warning restore NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method
        BusRouteDirectionsService busRouteDirectionsService;
        

        [OneTimeSetUp]
        public void Setup()
        {
            context = new AppDbContext(dbContextOptions);
            context.Database.EnsureCreated();

            SeedDatabase();

            busRouteDirectionsService = new BusRouteDirectionsService(context);
        }

        
        [Test, Order(1)]
        public void GetAllBusRouteDirectionsTest()
        {
            // Sprawdzam czy zwracana jest odpowiednia iloœæ kierunków
            var result = busRouteDirectionsService.GetAllBusRouteDirections();

            Assert.That(result.Count(), Is.EqualTo(3));
            Assert.AreEqual(result.Count, 3);
        }

        [Test, Order(2)]
        public void GetBusRouteDirectionsByBusIdTest()
        {
            // Sprawdzam czy dla danego busId zwracana jest odpowiednia iloœæ kierunków
            var busId = 1;
            var result = busRouteDirectionsService.GetBusRouteDirectionsByBusId(busId);

            Assert.That(result.Count(), Is.EqualTo(1));
            
            busId = 3;
            result = busRouteDirectionsService.GetBusRouteDirectionsByBusId(busId);

            Assert.That(result.Count(), Is.EqualTo(2));

            // Sprawdzam czy dla nieistniej¹cego busId zwracana jest pusta lista
            busId = 0;
            result = busRouteDirectionsService.GetBusRouteDirectionsByBusId(busId);

            Assert.That(result.Count(), Is.EqualTo(0));

            // Sprawdzam czy dla danego busId zwracana jest odpowiednia nazwa kierunku
            busId = 1;
            result = busRouteDirectionsService.GetBusRouteDirectionsByBusId(busId);

            Assert.That(result[0].Name, Is.EqualTo("KIELANÓWKA PÊTLA"));

            busId = 3;
            result = busRouteDirectionsService.GetBusRouteDirectionsByBusId(busId);

            Assert.That(result[0].Name, Is.EqualTo("STOBIERNA, KRZYWE PÊTLA"));
            Assert.That(result[1].Name, Is.EqualTo("PALIKÓWKA PÊTLA"));
        }

        //[Test, Order(3)]
        //public void AddBusRouteDirectionTest()
        //{
        //    var newBusRouteDirection = new BusRouteDirectionDTO()
        //    {
        //        Name = "G£OGÓW M£P. PÊTLA"
        //    };

        //    Assert.That(() => busRouteDirectionsService.AddBusRouteDirection(newBusRouteDirection), Throws.Nothing);
        //}

        [OneTimeTearDown]
        public void CleanUp()
        {
            context.Database.EnsureDeleted();
        }

        private void SeedDatabase()
        {
            var busRouteDirections = new List<BusRouteDirection>
            {
                new BusRouteDirection()
                {
                    Id = 1,
                    Name = "KIELANÓWKA PÊTLA",
                    BusId = 1,
                },
                new BusRouteDirection()
                {
                    Id = 2,
                    Name = "STOBIERNA, KRZYWE PÊTLA",
                    BusId = 3,
                },
                new BusRouteDirection()
                {
                    Id = 3,
                    Name = "PALIKÓWKA PÊTLA",
                    BusId = 3,
                },
            };
            context.BusRouteDirections.AddRange(busRouteDirections);
            context.SaveChanges();
        }
        
    }
}