using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PunkteSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddGruppeAndUserModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GruppeId",
                table: "Schwimmer",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GruppenId",
                table: "Schwimmer",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Benutzername = table.Column<string>(type: "text", nullable: false),
                    PasswortHash = table.Column<string>(type: "text", nullable: false),
                    GruppenId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Gruppen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gruppen", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Gruppen_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Schwimmer_GruppeId",
                table: "Schwimmer",
                column: "GruppeId");

            migrationBuilder.CreateIndex(
                name: "IX_Gruppen_UserId",
                table: "Gruppen",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Schwimmer_Gruppen_GruppeId",
                table: "Schwimmer",
                column: "GruppeId",
                principalTable: "Gruppen",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schwimmer_Gruppen_GruppeId",
                table: "Schwimmer");

            migrationBuilder.DropTable(
                name: "Gruppen");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Schwimmer_GruppeId",
                table: "Schwimmer");

            migrationBuilder.DropColumn(
                name: "GruppeId",
                table: "Schwimmer");

            migrationBuilder.DropColumn(
                name: "GruppenId",
                table: "Schwimmer");
        }
    }
}
