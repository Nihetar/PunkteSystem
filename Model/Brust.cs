using Microsoft.EntityFrameworkCore;

namespace PunkteSystem.Model;

[Owned]
public partial class Brust
{
    public bool BeinSchere { get; set; }

    public bool ArmeNichtGestreckt { get; set; }

    public bool KopfFalsch { get; set; }

    public bool KnieAnBrust { get; set; }

    public bool GabelFinger { get; set; }

    public bool KeineSchwimmstrucktur { get; set; }
}
