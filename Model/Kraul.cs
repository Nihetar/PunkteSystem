using Microsoft.EntityFrameworkCore;

namespace PunkteSystem.Model;

[Owned]
public partial class Kraul
{
    public bool KopfNichtGeradeNachUnten { get; set; }

    public bool BeineUnregelmaessig { get; set; }

    public bool BeineNichtGestreckt { get; set; }

    public bool ArmeNichtGestreckt { get; set; }

    public bool ArmeUnterwasserFalsch { get; set; }

    public bool AtmungFalsch { get; set; }

    public bool ArmeUnkoodiniert { get; set; }
}
