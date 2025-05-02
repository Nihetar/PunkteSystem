using System.ComponentModel.DataAnnotations;

namespace PunkteSystem.Model
{
    public class Gruppe
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public IEnumerable<Schwimmer> Schwimmers { get; set; } = null!;
    }
}
