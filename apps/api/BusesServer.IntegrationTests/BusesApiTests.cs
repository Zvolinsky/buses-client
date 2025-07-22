using BusesServer.Data.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Net;
using System.Net.Http.Json;
using System.Web.Http.Controllers;
using Xunit.Abstractions;

namespace BusesServer.IntegrationTests;

public class BusesApiTest : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    private readonly ITestOutputHelper _output;

    public BusesApiTest(CustomWebApplicationFactory<Program> factory, ITestOutputHelper output)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.Test.json", optional: false)
            .Build();

        var appFactory = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton<IConfiguration>(configuration);
            });
        });
        _client = factory.CreateClient();
        _output = output;
    }

    [Fact]
    public async Task GetAllBusesTest()
    {
        var request = "api/Buses/get-all-buses";

        var response = await _client.GetAsync(request);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var buses = await response.Content.ReadFromJsonAsync<List<Bus>>();
        Assert.True(buses.Count > 0);

    }
}