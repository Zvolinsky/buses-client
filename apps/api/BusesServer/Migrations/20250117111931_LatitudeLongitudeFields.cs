using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BusesServer.Migrations
{
    /// <inheritdoc />
    public partial class LatitudeLongitudeFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "BusStops",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "BusStops",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "BusStops");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "BusStops");
        }
    }
}
