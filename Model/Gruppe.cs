using System.ComponentModel.DataAnnotations;

namespace PunkteSystem.Model
{
    public class Gruppe
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public ICollection<Schwimmer> Schwimmers { get; set; } = new List<Schwimmer>();

    }
}
