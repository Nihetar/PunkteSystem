using Microsoft.EntityFrameworkCore;
using PunkteSystem.Model;

namespace PunkteSystem.EFCore;

public class SchwimmerContext : DbContext
{
    public SchwimmerContext(DbContextOptions<SchwimmerContext> options)
        : base(options) { }

    public DbSet<Schwimmer> Schwimmer { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<Zeit> Zeiten { get; set; }

    public DbSet<Gruppe> Gruppen { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Schwimmer>().ToTable("schwimmer");
    modelBuilder.Entity<User>().ToTable("users");
    modelBuilder.Entity<Zeit>().ToTable("zeiten");
    modelBuilder.Entity<Gruppe>().ToTable("gruppen");

    modelBuilder.Entity<Schwimmer>().OwnsOne(x => x.Grundfertigkeiten);
    modelBuilder.Entity<Schwimmer>().OwnsOne(x => x.Schwimmstile);
    modelBuilder.Entity<Schwimmer>().OwnsOne(x => x.Brust);
    modelBuilder.Entity<Schwimmer>().OwnsOne(x => x.Ruecken);
    modelBuilder.Entity<Schwimmer>().OwnsOne(x => x.Kraul);

    modelBuilder.Entity<Zeit>()
        .HasOne(z => z.Schwimmer)
        .WithMany(s => s.Zeiten)
        .HasForeignKey("SchwimmerId")
        .OnDelete(DeleteBehavior.Cascade);
}

}
