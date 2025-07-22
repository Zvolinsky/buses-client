using BusesServer.Data;
using BusesServer.Data.Models;
using BusesServer.Data.Services;
using Microsoft.EntityFrameworkCore;

namespace BusesServer.Tests
{
    public class BusRouteStopsServiceTest
    {
        private static DbContextOptions<AppDbContext> dbContextOptions = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "BusesDbTest")
            .Options;

#pragma warning disable NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method
        private AppDbContext context;
#pragma warning restore NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method

        BusRouteStopsService busRouteStopsService;


        [OneTimeSetUp]
        public void Setup()
        {
            context = new AppDbContext(dbContextOptions);
            context.Database.EnsureCreated();

            SeedDatabase();

            busRouteStopsService = new BusRouteStopsService(context);
        }

        [Test, Order(1)]
        public void GetBusRouteStopsTest()
        {
            // Sprawdzam czy dla danego busRouteDirectionId zwracana jest odpowiednia ilość przystanków
            var busRouteDirectionId = 1;
            var result = busRouteStopsService.GetBusRouteStops(busRouteDirectionId);

            Assert.That(result.Count(), Is.EqualTo(3));
            Assert.AreEqual(result.Count, 3);
            busRouteDirectionId = 2;
            result = busRouteStopsService.GetBusRouteStops(busRouteDirectionId);

            Assert.That(result.Count(), Is.EqualTo(4));
            Assert.AreEqual(result.Count, 4);

            // Sprawdzam czy dla danego busRouteDirectionId zwracane są przystanki o odpowiednim id
            busRouteDirectionId = 1;
            result = busRouteStopsService.GetBusRouteStops(busRouteDirectionId);

            Assert.That(result.Select(n => n.BusStopId).ToList(), Is.EquivalentTo(new List<int> { 34, 35, 37 }));
            Assert.AreEqual(result.Select(n => n.BusStopId).ToList(), new List<int> { 34, 35, 37 });

            busRouteDirectionId = 2;
            result = busRouteStopsService.GetBusRouteStops(busRouteDirectionId);

            Assert.That(result.Select(n => n.BusStopId).ToList(), Is.EquivalentTo(new List<int> { 37, 36, 35, 34 }));
            Assert.AreEqual(result.Select(n => n.BusStopId).ToList(), new List<int> { 37, 36, 35, 34 });

            // Sprawdzam czy dla nieistniejącego busRouteDirectionId zwracana jest pusta lista
            busRouteDirectionId = 3;
            result = busRouteStopsService.GetBusRouteStops(busRouteDirectionId);

            Assert.That(result.Count(), Is.EqualTo(0));
        }

        //[Test, Order(3)]
        //public void AddBusRouteStopTest()
        //{
        //    var newBusRouteStop = new BusRouteStopDTO()
        //    {
        //        BusStopId = 1,
        //        BusRouteDirectionId = 1,
        //        Order = 1
        //    };

        //    Assert.That(() => busRouteStopsService.AddBusRouteStop(newBusRouteStop), Throws.Nothing);
        //}

        [OneTimeTearDown]
        public void CleanUp()
        {
            context.Database.EnsureDeleted();
        }

        private void SeedDatabase()
        {
            var busRouteStops = new List<BusRouteStop>
            {
                new BusRouteStop
                {
                    Id = 1,
                    BusStopId = 34,
                    BusRouteDirectionId = 1,
                    Order = 1
                },
                new BusRouteStop
                {
                    Id = 2,
                    BusStopId = 35,
                    BusRouteDirectionId = 1,
                    Order = 2
                },
                new BusRouteStop
                {
                    Id = 3,
                    BusStopId = 37,
                    BusRouteDirectionId = 1,
                    Order = 3
                },
                new BusRouteStop
                {
                    Id = 4,
                    BusStopId = 37,
                    BusRouteDirectionId = 2,
                    Order = 1
                },
                new BusRouteStop
                {
                    Id = 5,
                    BusStopId = 36,
                    BusRouteDirectionId = 2,
                    Order = 2
                },
                new BusRouteStop
                {
                    Id = 6,
                    BusStopId = 35,
                    BusRouteDirectionId = 2,
                    Order = 3
                },
                new BusRouteStop
                {
                    Id = 7,
                    BusStopId = 34,
                    BusRouteDirectionId = 2,
                    Order = 4
                },
            };
            context.BusRouteStops.AddRange(busRouteStops);
            context.SaveChanges();
        }
    }
}
