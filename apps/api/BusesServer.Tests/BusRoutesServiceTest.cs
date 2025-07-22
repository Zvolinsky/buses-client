
using BusesServer.Data;
using BusesServer.Data.Models;
using BusesServer.Data.Services;
using Microsoft.EntityFrameworkCore;

namespace BusesServer.Tests
{
    public class BusRoutesServiceTest
    {
        private static DbContextOptions<AppDbContext> dbContextOptions = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "BusesDbTest")
            .Options;

#pragma warning disable NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method
        private AppDbContext context;
#pragma warning restore NUnit1032 // An IDisposable field/property should be Disposed in a TearDown method

        BusRoutesService busRoutesService;

        [OneTimeSetUp]
        public void Setup()
        {
            context = new AppDbContext(dbContextOptions);
            context.Database.EnsureCreated();

            SeedDatabase();

            busRoutesService = new BusRoutesService(context);
        }

        [Test, Order(1)]
        public void GetBusRoutesTest()
        {
            // Sprawdzam czy zwracana jest odpowiednia ilość kursów
            var result = busRoutesService.GetBusRoutes();

            Assert.That(result.Count(), Is.EqualTo(4));
            Assert.AreEqual(result.Count, 4);
        }

        [Test, Order(2)]
        public void GetBusRouteByIdTest()
        {
            // Sprawdzam czy dla danego id zwracana jest odpowiedni identyfikator kierunku
            var id = 1;
            var result = busRoutesService.GetBusRouteById(id);

            Assert.That(result.Id, Is.EqualTo(id));
            Assert.That(result.BusRouteDirectionId, Is.EqualTo(id));
        }

        //[Test, Order(3)]
        //public void AddBusRouteTest()
        //{
        //    var newBusRoute = new BusRouteDTO()
        //    {
        //        BusRouteDirectionId = 1,
        //    };

        //    Assert.That(() => busRoutesService.AddBusRoute(newBusRoute), Throws.Nothing);
        //}

        [OneTimeTearDown]
        public void CleanUp()
        {
            context.Database.EnsureDeleted();
        }

        private void SeedDatabase()
        {
            var busRoutes = new List<BusRoute>
            {
                new BusRoute
                {
                    Id = 1,
                    BusRouteDirectionId = 1,
                },
                new BusRoute
                {
                    Id=2,
                    BusRouteDirectionId = 2,
                },
                new BusRoute
                {
                    Id=3,
                    BusRouteDirectionId = 1,
                },
                new BusRoute
                {
                    Id = 4,
                    BusRouteDirectionId = 2,
                }
            };
            context.BusRoutes.AddRange(busRoutes);
            context.SaveChanges();
        }
    }
}
