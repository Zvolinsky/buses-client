using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BusesServer.Migrations
{
    /// <inheritdoc />
    public partial class SixClasses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Buses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Number = table.Column<string>(type: "nvarchar(5)", maxLength: 5, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Buses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BusStops",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusStops", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BusRouteDirections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusRouteDirections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BusRouteDirections_Buses_BusId",
                        column: x => x.BusId,
                        principalTable: "Buses",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "BusRoutes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusRouteDirectionId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusRoutes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BusRoutes_BusRouteDirections_BusRouteDirectionId",
                        column: x => x.BusRouteDirectionId,
                        principalTable: "BusRouteDirections",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "BusRouteStops",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusStopId = table.Column<int>(type: "int", nullable: true),
                    BusRouteId = table.Column<int>(type: "int", nullable: true),
                    Order = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusRouteStops", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BusRouteStops_BusRoutes_BusRouteId",
                        column: x => x.BusRouteId,
                        principalTable: "BusRoutes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BusRouteStops_BusStops_BusStopId",
                        column: x => x.BusStopId,
                        principalTable: "BusStops",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Departures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Hour = table.Column<int>(type: "int", nullable: false),
                    Minute = table.Column<int>(type: "int", nullable: false),
                    DayOfWeek = table.Column<int>(type: "int", nullable: false),
                    RouteInfo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BusRouteId = table.Column<int>(type: "int", nullable: true),
                    BusId = table.Column<int>(type: "int", nullable: true),
                    BusStopId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Departures_BusRoutes_BusRouteId",
                        column: x => x.BusRouteId,
                        principalTable: "BusRoutes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Departures_BusStops_BusStopId",
                        column: x => x.BusStopId,
                        principalTable: "BusStops",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Departures_Buses_BusId",
                        column: x => x.BusId,
                        principalTable: "Buses",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BusRouteDirections_BusId",
                table: "BusRouteDirections",
                column: "BusId");

            migrationBuilder.CreateIndex(
                name: "IX_BusRoutes_BusRouteDirectionId",
                table: "BusRoutes",
                column: "BusRouteDirectionId");

            migrationBuilder.CreateIndex(
                name: "IX_BusRouteStops_BusRouteId",
                table: "BusRouteStops",
                column: "BusRouteId");

            migrationBuilder.CreateIndex(
                name: "IX_BusRouteStops_BusStopId",
                table: "BusRouteStops",
                column: "BusStopId");

            migrationBuilder.CreateIndex(
                name: "IX_Departures_BusId",
                table: "Departures",
                column: "BusId");

            migrationBuilder.CreateIndex(
                name: "IX_Departures_BusRouteId",
                table: "Departures",
                column: "BusRouteId");

            migrationBuilder.CreateIndex(
                name: "IX_Departures_BusStopId",
                table: "Departures",
                column: "BusStopId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BusRouteStops");

            migrationBuilder.DropTable(
                name: "Departures");

            migrationBuilder.DropTable(
                name: "BusRoutes");

            migrationBuilder.DropTable(
                name: "BusStops");

            migrationBuilder.DropTable(
                name: "BusRouteDirections");

            migrationBuilder.DropTable(
                name: "Buses");
        }
    }
}
