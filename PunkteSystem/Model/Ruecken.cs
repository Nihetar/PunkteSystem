using Microsoft.EntityFrameworkCore;

namespace PunkteSystem.Model;

[Owned]
public partial class Ruecken
{
    public bool BauchUnten { get; set; }

    public bool KopfNichtGerade { get; set; }

    public bool HuefteNichtGerade { get; set; }

    public bool ArmeNichtAmOhr { get; set; }

    public bool ArmeUnterwasserFalsch { get; set; }

    public bool BeineNichtGestreckt { get; set; }

    public bool BeineUnregelmaessig { get; set; }

    public bool ArmeUnkoodiniert { get; set; }
}
