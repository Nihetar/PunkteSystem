using System.ComponentModel.DataAnnotations;

namespace PunkteSystem.Model
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Benutzername { get; set; } = string.Empty;

        [Required]
        public string PasswortHash { get; set; } = string.Empty;

        [Required]
        public int GruppenId { get; set; }
        
        [Required]
        public IEnumerable<Gruppe> Gruppen { get; set; } = null!;
    }
}
