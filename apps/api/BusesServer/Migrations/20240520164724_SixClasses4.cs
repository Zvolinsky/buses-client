using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BusesServer.Migrations
{
    /// <inheritdoc />
    public partial class SixClasses4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DayOfWeek",
                table: "Departures");

            migrationBuilder.DropColumn(
                name: "RouteInfo",
                table: "Departures");

            migrationBuilder.AddColumn<int>(
                name: "DayOfWeek",
                table: "BusRoutes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "RouteInfo",
                table: "BusRoutes",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DayOfWeek",
                table: "BusRoutes");

            migrationBuilder.DropColumn(
                name: "RouteInfo",
                table: "BusRoutes");

            migrationBuilder.AddColumn<int>(
                name: "DayOfWeek",
                table: "Departures",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "RouteInfo",
                table: "Departures",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
