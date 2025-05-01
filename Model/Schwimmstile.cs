using Microsoft.EntityFrameworkCore;

namespace PunkteSystem.Model;

[Owned]
public partial class Schwimmstile
{
    public bool KeinRuecken { get; set; }

    public bool KeinKraul { get; set; }

    public bool KeinBrust { get; set; }

    public bool GrobRuecken { get; set; }

    public bool GrobKraul { get; set; }

    public bool GrobBrust { get; set; }
}
