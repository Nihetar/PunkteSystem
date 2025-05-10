using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PunkteSystem.EFCore;
using PunkteSystem.Model;

namespace PunkteSystem.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GruppenController(SchwimmerContext context) : ControllerBase
{
    private readonly SchwimmerContext context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Gruppe>>> GetAllGroups()
    {
        return await context.Gruppen
            .Include(g => g.Schwimmers)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Gruppe>> CreateGroup(Gruppe group)
    {
        context.Gruppen.Add(group);
        await context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAllGroups), new { id = group.Id }, group);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGroup(int id, Gruppe group)
    {
        if (id != group.Id)
            return BadRequest();

        context.Entry(group).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPut("{groupId}/swimmers")]
    public async Task<IActionResult> UpdateGroupSwimmers(int groupId, List<int> swimmerIds)
    {
        var group = await context.Gruppen.Include(g => g.Schwimmers).FirstOrDefaultAsync(g => g.Id == groupId);
        if (group == null)
            return NotFound();

        var selectedSwimmers = await context.Schwimmer.Where(s => swimmerIds.Contains(s.Id)).ToListAsync();

        foreach (var swimmer in selectedSwimmers)
        {
            swimmer.GruppenId = groupId;
            swimmer.Gruppe = group.Name;
        }

        await context.SaveChangesAsync();
        return Ok(new { message = "Group updated" });
    }
}
