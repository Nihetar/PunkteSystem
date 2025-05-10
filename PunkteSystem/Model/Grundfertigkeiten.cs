using Microsoft.EntityFrameworkCore;

namespace PunkteSystem.Model;

[Owned]
public partial class Grundfertigkeiten
{
    public bool Atmen { get; set; }

    public bool Tauchen { get; set; }

    public bool Gleiten { get; set; }

    public bool Springen { get; set; }

    public bool Rollen { get; set; }

    public bool Drehen { get; set; }

    public bool Fortbewegen { get; set; }
}
