using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PunkteSystem.Migrations
{
    /// <inheritdoc />
    public partial class Schwimmer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Schwimmer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Gruppe = table.Column<string>(type: "text", nullable: false),
                    Grundfertigkeiten_Atmen = table.Column<bool>(type: "boolean", nullable: false),
                    Grundfertigkeiten_Tauchen = table.Column<bool>(type: "boolean", nullable: false),
                    Grundfertigkeiten_Gleiten = table.Column<bool>(type: "boolean", nullable: false),
                    Grundfertigkeiten_Springen = table.Column<bool>(type: "boolean", nullable: false),
                    Grundfertigkeiten_Rollen = table.Column<bool>(type: "boolean", nullable: false),
                    Grundfertigkeiten_Drehen = table.Column<bool>(type: "boolean", nullable: false),
                    Grundfertigkeiten_Fortbewegen = table.Column<bool>(type: "boolean", nullable: false),
                    Schwimmstile_KeinRuecken = table.Column<bool>(type: "boolean", nullable: false),
                    Schwimmstile_KeinKraul = table.Column<bool>(type: "boolean", nullable: false),
                    Schwimmstile_KeinBrust = table.Column<bool>(type: "boolean", nullable: false),
                    Schwimmstile_GrobRuecken = table.Column<bool>(type: "boolean", nullable: false),
                    Schwimmstile_GrobKraul = table.Column<bool>(type: "boolean", nullable: false),
                    Schwimmstile_GrobBrust = table.Column<bool>(type: "boolean", nullable: false),
                    Brust_BeinSchere = table.Column<bool>(type: "boolean", nullable: false),
                    Brust_ArmeNichtGestreckt = table.Column<bool>(type: "boolean", nullable: false),
                    Brust_KopfFalsch = table.Column<bool>(type: "boolean", nullable: false),
                    Brust_KnieAnBrust = table.Column<bool>(type: "boolean", nullable: false),
                    Brust_GabelFinger = table.Column<bool>(type: "boolean", nullable: false),
                    Brust_KeineSchwimmstrucktur = table.Column<bool>(type: "boolean", nullable: false),
                    Ruecken_BauchUnten = table.Column<bool>(type: "boolean", nullable: false),
                    Ruecken_KopfNichtGerade = table.Column<bool>(type: "boolean", nullable: false),
                    Ruecken_HuefteNichtGerade = table.Column<bool>(type: "boolean", nullable: false),
                    Ruecken_ArmeNichtAmOhr = table.Column<bool>(type: "boolean", nullable: false),
                    Ruecken_ArmeUnterwasserFalsch = table.Column<bool>(type: "boolean", nullable: false),
                    Ruecken_BeineNichtGestreckt = table.Column<bool>(type: "boolean", nullable: false),
                    Ruecken_BeineUnregelmaessig = table.Column<bool>(type: "boolean", nullable: false),
                    Ruecken_ArmeUnkoodiniert = table.Column<bool>(type: "boolean", nullable: false),
                    Kraul_KopfNichtGeradeNachUnten = table.Column<bool>(type: "boolean", nullable: false),
                    Kraul_BeineUnregelmaessig = table.Column<bool>(type: "boolean", nullable: false),
                    Kraul_BeineNichtGestreckt = table.Column<bool>(type: "boolean", nullable: false),
                    Kraul_ArmeNichtGestreckt = table.Column<bool>(type: "boolean", nullable: false),
                    Kraul_ArmeUnterwasserFalsch = table.Column<bool>(type: "boolean", nullable: false),
                    Kraul_AtmungFalsch = table.Column<bool>(type: "boolean", nullable: false),
                    Kraul_ArmeUnkoodiniert = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schwimmer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Zeiten",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Strecke = table.Column<string>(type: "text", nullable: false),
                    ZeitStrecke = table.Column<string>(type: "text", nullable: false),
                    SchwimmerId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zeiten", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Zeiten_Schwimmer_SchwimmerId",
                        column: x => x.SchwimmerId,
                        principalTable: "Schwimmer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Zeiten_SchwimmerId",
                table: "Zeiten",
                column: "SchwimmerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Zeiten");

            migrationBuilder.DropTable(
                name: "Schwimmer");
        }
    }
}
