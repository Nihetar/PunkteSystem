using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PunkteSystem.EFCore;
using PunkteSystem.Model;

namespace PunkteSystem.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SchwimmerController(SchwimmerContext context) : ControllerBase
{
    private readonly SchwimmerContext context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Schwimmer>>> GetAll()
    {
        var schwimmer = await context.Schwimmer.ToListAsync();
        return Ok(schwimmer);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Schwimmer>> Get(int id)
    {
        var schwimmer = await context.Schwimmer.FindAsync(id);
        if (schwimmer == null)
            return NotFound();
        return Ok(schwimmer);
    }

    [HttpPost]
    public async Task<ActionResult<Schwimmer>> Create(Schwimmer schwimmer)
    {
        context.Schwimmer.Add(schwimmer);
        await context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = schwimmer.Id }, schwimmer);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Schwimmer schwimmer)
    {
        if (id != schwimmer.Id)
            return BadRequest();
        context.Entry(schwimmer).State = EntityState.Modified;
        context.Entry(schwimmer.Brust).State = EntityState.Modified;
        context.Entry(schwimmer.Kraul).State = EntityState.Modified;
        context.Entry(schwimmer.Ruecken).State = EntityState.Modified;
        context.Entry(schwimmer.Grundfertigkeiten).State = EntityState.Modified;
        context.Entry(schwimmer.Schwimmstile).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = schwimmer.Id }, schwimmer);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var schwimmer = await context.Schwimmer.FindAsync(id);
        if (schwimmer == null)
            return NotFound();
        context.Schwimmer.Remove(schwimmer);
        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("SaveSwimmingData")]
    public async Task<IActionResult> SaveSwimmingDataAsync([FromBody] string inputText)
    {
        var lines = inputText.Split(';', StringSplitOptions.RemoveEmptyEntries);

        foreach (var line in lines)
        {
            var trimmedLine = line.Trim();
            if (string.IsNullOrWhiteSpace(trimmedLine)) continue;

            var parts = trimmedLine.Split(',', StringSplitOptions.RemoveEmptyEntries);

            if (parts.Length != 4)
                continue; // oder return BadRequest($"Ungültiges Format in: {line}");

            var nachname = parts[0].Trim();
            var vorname = parts[1].Trim();
            var geburtsdatumText = parts[2].Trim();
            var gruppe = parts[3].Trim();

            if (!DateTime.TryParseExact(geburtsdatumText, "dd.MM.yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedGeburtsdatum))
                continue; // oder return BadRequest($"Ungültiges Datum in: {geburtsdatumText}");

            parsedGeburtsdatum = DateTime.SpecifyKind(parsedGeburtsdatum, DateTimeKind.Utc);

            bool exists = await context.Schwimmer.AnyAsync(s =>
                s.Vorname == vorname &&
                s.Nachname == nachname &&
                s.Geburtsdatum.Date == parsedGeburtsdatum.Date);

            if (!exists)
            {
                var neuerSchwimmer = new Schwimmer
                {
                    Vorname = vorname,
                    Nachname = nachname,
                    Geburtsdatum = parsedGeburtsdatum,
                    Gruppe = gruppe,
                    GruppenId = 0,
                    Punkte = 0,
                    Brust = new Brust(),
                    Kraul = new Kraul(),
                    Ruecken = new Ruecken(),
                    Grundfertigkeiten = new Grundfertigkeiten(),
                    Schwimmstile = new Schwimmstile()
                };

                context.Schwimmer.Add(neuerSchwimmer);
            }
        }

        await context.SaveChangesAsync();
        return Ok(new { message = "Schwimmerdaten erfolgreich importiert." });
    }
}
