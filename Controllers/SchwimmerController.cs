using System.Text.RegularExpressions;
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
        List<string> schwimmerGruppeList = new List<string>();
        List<string> schwimmerNameList = new List<string>();

        var lines = inputText.Split(';');

        foreach (var line in lines)
        {
            var trimmedLine = line.Trim();

            if (string.IsNullOrEmpty(trimmedLine))
                continue;

            var parts = trimmedLine.Split(',');

            if (parts.Length == 2)
            {
                var groupName = parts[0].Trim();
                var swimmerName = parts[1].Trim();

                schwimmerGruppeList.Add(groupName);
                schwimmerNameList.Add(swimmerName);
            }
        }

        // Iterate over schwimmerGruppeList and schwimmerNameList
        for (int i = 0; i < schwimmerGruppeList.Count; i++)
        {
            var groupName = schwimmerGruppeList[i];
            var swimmerName = schwimmerNameList[i];

            // Check if the swimmer already exists in the database
            var exist = await context.Schwimmer
                                     .AnyAsync(s => s.Name == swimmerName);

            if (!exist)
            {
                var schwimmer = new Schwimmer
                {
                    Brust = new Brust
                    {
                        ArmeNichtGestreckt = false,
                        BeinSchere = false,
                        GabelFinger = false,
                        KeineSchwimmstrucktur = false,
                        KnieAnBrust = false,
                        KopfFalsch = false
                    },

                    Grundfertigkeiten = new Grundfertigkeiten
                    {
                        Atmen = false,
                        Drehen = false,
                        Fortbewegen = false,
                        Gleiten = false,
                        Rollen = false,
                        Springen = false,
                        Tauchen = false
                    },

                    Kraul = new Kraul
                    {
                        ArmeNichtGestreckt = false,
                        ArmeUnkoodiniert = false,
                        ArmeUnterwasserFalsch = false,
                        AtmungFalsch = false,
                        BeineNichtGestreckt = false,
                        BeineUnregelmaessig = false,
                        KopfNichtGeradeNachUnten = false
                    },

                    Ruecken = new Ruecken
                    {
                        ArmeNichtAmOhr = false,
                        ArmeUnkoodiniert = false,
                        ArmeUnterwasserFalsch = false,
                        BauchUnten = false,
                        BeineNichtGestreckt = false,
                        BeineUnregelmaessig = false,
                        HuefteNichtGerade = false,
                        KopfNichtGerade = false
                    },

                    Schwimmstile = new Schwimmstile
                    {
                        GrobBrust = false,
                        GrobKraul = false,
                        GrobRuecken = false,
                        KeinBrust = false,
                        KeinKraul = false,
                        KeinRuecken = false
                    },

                    Gruppe = groupName,
                    Name = swimmerName,
                };

                context.Add(schwimmer);
            }
        }

        await context.SaveChangesAsync();
        return Ok(new { message = "Swimming data saved successfully." });
    }

}
