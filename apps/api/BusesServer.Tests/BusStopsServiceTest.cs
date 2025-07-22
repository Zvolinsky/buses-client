using BusesServer.Data;
using BusesServer.Data.Models;
using BusesServer.Data.Services;
using Microsoft.EntityFrameworkCore;

namespace BusesServer.Tests
{
    public class BusStopsServiceTest
    {
        private static DbContextOptions<AppDbContext> dbContextOptions = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "BusesDbTest")
            .Options;

#pragma warning disable NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method
        private AppDbContext context;
#pragma warning restore NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method

        BusStopsService busStopsService;


        [OneTimeSetUp]
        public void Setup()
        {
            context = new AppDbContext(dbContextOptions);
            context.Database.EnsureCreated();

            SeedDatabase();

            busStopsService = new BusStopsService(context);
        }

        [Test, Order(1)]
        public void GetAllBusStopsTest()
        {
            // Sprawdzam czy zwracana jest odpowiednia ilość przystanków autobusowych
            var result = busStopsService.GetAllBusStops();

            Assert.That(result.Count(), Is.EqualTo(4));
            Assert.AreEqual(result.Count, 4);
        }

        [Test, Order(2)]
        public void GetBusStopByIdTest()
        {
            // Sprawdzam jak serwis radzi sobie z nieprawidłowymi identyfikatorami, np. ujemnymi lub zerowymi
            var id = -1;
            var result = busStopsService.GetBusStopById(id);
            Assert.That(result, Is.Null);

            id = 0;
            result = busStopsService.GetBusStopById(id);
            Assert.That(result, Is.Null);

            // Sprawdzam czy dla danego id zwracana jest odpowiednia nazwa przystanku autobusowego
            id = 1;
            result = busStopsService.GetBusStopById(id);
            Assert.That(result.Id, Is.EqualTo(id));
            Assert.That(result.Name, Is.EqualTo("JASIONKA, BORG"));

            id = 2;
            result = busStopsService.GetBusStopById(id);
            Assert.That(result.Id, Is.EqualTo(id));
            Assert.That(result.Name, Is.EqualTo("JASIONKA, PORT LOTNICZY"));
            
            id = 3;
            result = busStopsService.GetBusStopById(id);
            Assert.That(result.Id, Is.EqualTo(id));
            Assert.That(result.Name, Is.EqualTo("JASIONKA, AEROCLUB"));
            
            id = 4;
            result = busStopsService.GetBusStopById(id);
            Assert.That(result.Id, Is.EqualTo(id));
            Assert.That(result.Name, Is.EqualTo("MEDYNIA ŁAŃCUCKA II"));

            // Sprawdzam czy dla nieistniejącego id zwracana jest pusta lista
            id = 5;
            result = busStopsService.GetBusStopById(id);
            Assert.That(result, Is.Null);
        }

        [OneTimeTearDown]
        public void CleanUp()
        {
            context.Database.EnsureDeleted();
        }

        private void SeedDatabase()
        {
            var busStops = new List<BusStop>
            {
                new BusStop
                {
                    Id = 1,
                    Name = "JASIONKA, BORG"
                },
                new BusStop
                {
                    Id = 2,
                    Name = "JASIONKA, PORT LOTNICZY"
                },
                new BusStop
                {
                    Id = 3,
                    Name = "JASIONKA, AEROCLUB"
                },
                new BusStop
                {
                    Id = 4,
                    Name = "MEDYNIA ŁAŃCUCKA II"
                },
            };
            context.BusStops.AddRange(busStops);
            context.SaveChanges();
        }
    }
}
