using System.ComponentModel.DataAnnotations;
using PunkteSystem.Model;

public class Zeit 
{
    [Key]
    public int Id { get; set; }

    public string Strecke { get; set; } = string.Empty;

    public string ZeitStrecke { get; set; } = string.Empty;

    public Schwimmer Schwimmer { get; set; } = null!;
}
