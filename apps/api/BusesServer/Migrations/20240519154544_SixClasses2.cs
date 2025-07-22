using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BusesServer.Migrations
{
    /// <inheritdoc />
    public partial class SixClasses2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BusRouteStops_BusRoutes_BusRouteId",
                table: "BusRouteStops");

            migrationBuilder.RenameColumn(
                name: "BusRouteId",
                table: "BusRouteStops",
                newName: "BusRouteDirectionId");

            migrationBuilder.RenameIndex(
                name: "IX_BusRouteStops_BusRouteId",
                table: "BusRouteStops",
                newName: "IX_BusRouteStops_BusRouteDirectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_BusRouteStops_BusRouteDirections_BusRouteDirectionId",
                table: "BusRouteStops",
                column: "BusRouteDirectionId",
                principalTable: "BusRouteDirections",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BusRouteStops_BusRouteDirections_BusRouteDirectionId",
                table: "BusRouteStops");

            migrationBuilder.RenameColumn(
                name: "BusRouteDirectionId",
                table: "BusRouteStops",
                newName: "BusRouteId");

            migrationBuilder.RenameIndex(
                name: "IX_BusRouteStops_BusRouteDirectionId",
                table: "BusRouteStops",
                newName: "IX_BusRouteStops_BusRouteId");

            migrationBuilder.AddForeignKey(
                name: "FK_BusRouteStops_BusRoutes_BusRouteId",
                table: "BusRouteStops",
                column: "BusRouteId",
                principalTable: "BusRoutes",
                principalColumn: "Id");
        }
    }
}
