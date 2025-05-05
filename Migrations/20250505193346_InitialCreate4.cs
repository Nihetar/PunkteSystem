using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PunkteSystem.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "schwimmer",
                newName: "Vorname");

            migrationBuilder.AddColumn<DateTime>(
                name: "Geburtsdatum",
                table: "schwimmer",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Nachname",
                table: "schwimmer",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Geburtsdatum",
                table: "schwimmer");

            migrationBuilder.DropColumn(
                name: "Nachname",
                table: "schwimmer");

            migrationBuilder.RenameColumn(
                name: "Vorname",
                table: "schwimmer",
                newName: "Name");
        }
    }
}
