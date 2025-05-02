using Microsoft.EntityFrameworkCore;
using PunkteSystem.EFCore;

var builder = WebApplication.CreateBuilder(args);

// Füge die Controller und DbContext-Dienste hinzu
builder.Services.AddControllers();
builder.Services.AddDbContext<SchwimmerContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Aktiviere Swagger
app.UseSwagger();
app.UseSwaggerUI(c => 
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
    c.RoutePrefix = string.Empty; // Setzt Swagger auf die Root-URL
});

// Autorisierung und Controller-Routen konfigurieren
app.UseAuthorization();
app.MapControllers();

// Starte die Anwendung
app.Run();
