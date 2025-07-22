
using BusesServer.Data;
using BusesServer.Data.Services;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnectionString");
// Add services to the container.

builder.Services.AddControllers();

// Configure DBContext with SQL
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));

//Configure the services
builder.Services.AddTransient<BusesService>();
builder.Services.AddTransient<BusStopsService>();
builder.Services.AddTransient<BusRoutesService>();
builder.Services.AddTransient<BusRouteDirectionsService>();
builder.Services.AddTransient<BusRouteStopsService>();
builder.Services.AddTransient<DeparturesService>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


app.Run();

public partial class Program { }