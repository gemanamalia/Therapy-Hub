using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : IdentityDbContext<User, Role, int>
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        public DbSet<Basket> Baskets { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<PhoneContact> PhoneContacts { get; set; }
        public DbSet<LinkContact>  LinkContacts { get; set; }
        public DbSet<Testimonial>  Testimonials { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasOne(a => a.Address)
                .WithOne()
                .HasForeignKey<UserAddress>(a => a.Id)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<User>()
                .HasOne(a => a.Portofolio)
                .WithOne()
                .HasForeignKey<UserPortofolio>(a => a.Id)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Appointment>()
                .HasOne(a => a.User)
                .WithMany(u => u.Appointments)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<Booking>()
                .HasOne(a => a.User)
                .WithMany(u => u.Bookings)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);


            builder.Entity<Role>()
                .HasData(
                    new Role{Id = 1, Name = "Member", NormalizedName = "MEMBER"},
                    new Role{Id = 2, Name = "Admin", NormalizedName = "ADMIN"},
                    new Role{Id = 3, Name = "Doctor", NormalizedName = "DOCTOR"}
                );
        }
    }
}