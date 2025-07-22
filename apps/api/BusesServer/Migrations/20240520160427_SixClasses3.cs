using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BusesServer.Migrations
{
    /// <inheritdoc />
    public partial class SixClasses3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "BusRouteDirections",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "BusRouteDirections");
        }
    }
}
