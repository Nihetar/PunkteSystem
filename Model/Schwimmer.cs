using System.ComponentModel.DataAnnotations;

namespace PunkteSystem.Model;

public class Schwimmer
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Vorname { get; set; } = string.Empty;

    [Required]
    public string Nachname { get; set; } = string.Empty;

    [Required]
    public DateTime Geburtsdatum { get; set; }

    [Required]
    public int Punkte { get; set; }

    [Required]
    public int GruppenId { get; set; }

    [Required]
    public string Gruppe { get; set; } = string.Empty;

    [Required]
    public Grundfertigkeiten Grundfertigkeiten { get; set; } = new();

    [Required]
    public Schwimmstile Schwimmstile { get; set; } = new();

    [Required]
    public Brust Brust { get; set; } = new();

    [Required]
    public Ruecken Ruecken { get; set; } = new();

    [Required]
    public Kraul Kraul { get; set; } = new();

    public IEnumerable<Zeit> Zeiten = null!;
}
