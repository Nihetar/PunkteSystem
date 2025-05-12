using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PunkteSystem.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gruppen_Users_UserId",
                table: "Gruppen");

            migrationBuilder.DropForeignKey(
                name: "FK_Schwimmer_Gruppen_GruppeId",
                table: "Schwimmer");

            migrationBuilder.DropForeignKey(
                name: "FK_Zeiten_Schwimmer_SchwimmerId",
                table: "Zeiten");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Zeiten",
                table: "Zeiten");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Schwimmer",
                table: "Schwimmer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Gruppen",
                table: "Gruppen");

            migrationBuilder.RenameTable(
                name: "Zeiten",
                newName: "zeiten");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "users");

            migrationBuilder.RenameTable(
                name: "Schwimmer",
                newName: "schwimmer");

            migrationBuilder.RenameTable(
                name: "Gruppen",
                newName: "gruppen");

            migrationBuilder.RenameIndex(
                name: "IX_Zeiten_SchwimmerId",
                table: "zeiten",
                newName: "IX_zeiten_SchwimmerId");

            migrationBuilder.RenameIndex(
                name: "IX_Schwimmer_GruppeId",
                table: "schwimmer",
                newName: "IX_schwimmer_GruppeId");

            migrationBuilder.RenameIndex(
                name: "IX_Gruppen_UserId",
                table: "gruppen",
                newName: "IX_gruppen_UserId");

            migrationBuilder.AddColumn<int>(
                name: "Punkte",
                table: "schwimmer",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_zeiten",
                table: "zeiten",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_users",
                table: "users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_schwimmer",
                table: "schwimmer",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_gruppen",
                table: "gruppen",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_gruppen_users_UserId",
                table: "gruppen",
                column: "UserId",
                principalTable: "users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_schwimmer_gruppen_GruppeId",
                table: "schwimmer",
                column: "GruppeId",
                principalTable: "gruppen",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_zeiten_schwimmer_SchwimmerId",
                table: "zeiten",
                column: "SchwimmerId",
                principalTable: "schwimmer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_gruppen_users_UserId",
                table: "gruppen");

            migrationBuilder.DropForeignKey(
                name: "FK_schwimmer_gruppen_GruppeId",
                table: "schwimmer");

            migrationBuilder.DropForeignKey(
                name: "FK_zeiten_schwimmer_SchwimmerId",
                table: "zeiten");

            migrationBuilder.DropPrimaryKey(
                name: "PK_zeiten",
                table: "zeiten");

            migrationBuilder.DropPrimaryKey(
                name: "PK_users",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_schwimmer",
                table: "schwimmer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_gruppen",
                table: "gruppen");

            migrationBuilder.DropColumn(
                name: "Punkte",
                table: "schwimmer");

            migrationBuilder.RenameTable(
                name: "zeiten",
                newName: "Zeiten");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "schwimmer",
                newName: "Schwimmer");

            migrationBuilder.RenameTable(
                name: "gruppen",
                newName: "Gruppen");

            migrationBuilder.RenameIndex(
                name: "IX_zeiten_SchwimmerId",
                table: "Zeiten",
                newName: "IX_Zeiten_SchwimmerId");

            migrationBuilder.RenameIndex(
                name: "IX_schwimmer_GruppeId",
                table: "Schwimmer",
                newName: "IX_Schwimmer_GruppeId");

            migrationBuilder.RenameIndex(
                name: "IX_gruppen_UserId",
                table: "Gruppen",
                newName: "IX_Gruppen_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Zeiten",
                table: "Zeiten",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Schwimmer",
                table: "Schwimmer",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Gruppen",
                table: "Gruppen",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Gruppen_Users_UserId",
                table: "Gruppen",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Schwimmer_Gruppen_GruppeId",
                table: "Schwimmer",
                column: "GruppeId",
                principalTable: "Gruppen",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Zeiten_Schwimmer_SchwimmerId",
                table: "Zeiten",
                column: "SchwimmerId",
                principalTable: "Schwimmer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
