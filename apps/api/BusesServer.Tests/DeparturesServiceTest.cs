using BusesServer.Data;
using BusesServer.Data.Models;
using BusesServer.Data.Services;
using Microsoft.EntityFrameworkCore;

namespace BusesServer.Tests
{
    public class DeparturesServiceTest
    {
         private static DbContextOptions<AppDbContext> dbContextOptions = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "BusesDbTest")
            .Options;

#pragma warning disable NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method
        private AppDbContext context;
#pragma warning restore NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method
        DeparturesService departuresService;
        

        [OneTimeSetUp]
        public void Setup()
        {
            context = new AppDbContext(dbContextOptions);
            context.Database.EnsureCreated();

            SeedDatabase();

            departuresService = new DeparturesService(context);
        }

        
        [Test, Order(1)]
        public void GetDeparturesTest()
        {
            // Sprawdzamy czy zwracana lista wszystkich odjazdów jest zgodna z za³o¿eniem
            var result = departuresService.GetDepartures(0, 0, 0, 0, 0, 0, false, false, false);

            Assert.That(result.Count, Is.EqualTo(5));

            // Sprawdzam czy dla danego busId zwracana jest odpowiednia iloœæ odjazdów
            var busId = 1;
            result = departuresService.GetDepartures(busId, 0, 0, 0, 0, 0, false, false, false);

            Assert.That(result.Count, Is.EqualTo(3));

            busId = 2;
            result = departuresService.GetDepartures(busId, 0, 0, 0, 0, 0, false, false, false);

            Assert.That(result.Count, Is.EqualTo(2));

            // Sprawdzam czy dla danego busStopId zwracana jest odpowiednia iloœæ odjazdów
            var busStopId = 34;
            result = departuresService.GetDepartures(0, busStopId, 0, 0, 0, 0, false, false, false);

            Assert.That(result.Count, Is.EqualTo(2));

            busStopId = 6;
            result = departuresService.GetDepartures(0, busStopId, 0, 0, 0, 0, false, false, false);

            Assert.That(result.Count, Is.EqualTo(2));

           

        }

        [Test, Order(2)]
        public void GetBusByIdTest()
        {
            var id = 1;
            var result = departuresService.GetDepartureById(id);

            Assert.That(result.Id, Is.EqualTo(id));
        }


        [OneTimeTearDown]
        public void CleanUp()
        {
            context.Database.EnsureDeleted();
        }

        private void SeedDatabase()
        {
            var departures = new List<Departure>
            {
                new Departure
                {
                    Id = 1,
                    Hour = 9,
                    Minute= 13,
                    BusRouteId = 1,
                    BusId = 1,
                    BusStopId = 4
                },
                new Departure
                {
                    Id = 2,
                    Hour = 10,
                    Minute= 15,
                    BusRouteId = 3,
                    BusId = 1,
                    BusStopId = 6
                },
                new Departure
                {
                    Id = 3,
                    Hour = 12,
                    Minute= 45,
                    BusRouteId = 8,
                    BusId = 1,
                    BusStopId = 6
                },
                new Departure
                {
                    Id = 4,
                    Hour = 9,
                    Minute= 14,
                    BusRouteId = 20,
                    BusId = 2,
                    BusStopId = 34
                },
                new Departure
                {
                    Id = 5,
                    Hour = 10,
                    Minute= 12,
                    BusRouteId = 22,
                    BusId = 2,
                    BusStopId = 34
                },
            };
            context.Departures.AddRange(departures);
            context.SaveChanges();
        }
        
    }
}