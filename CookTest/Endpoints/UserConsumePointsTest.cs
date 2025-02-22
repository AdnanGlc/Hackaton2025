using backend.Endpoints.UserEndpoints;
using backend.Models;
using FakeItEasy;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace CookTest.Endpoints
{
    public class UserConsumePointsTest
    {
        private readonly ApplicationDb _db;

        public UserConsumePointsTest()
        {
            // Kreiraj InMemory bazu podataka za testiranje
            var options = new DbContextOptionsBuilder<ApplicationDb>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            // Kreiraj instancu ApplicationDb sa InMemory bazom
            _db = new ApplicationDb(options);

            // Dodaj testnog korisnika u InMemory bazu
            _db.Users.Add(new User { Id = "user123", Points = 100 });
            _db.SaveChanges();
        }

        [Fact]
        public async Task HandleAsync_Should_Return_TotalPoints_When_User_Consumes()
        {
            // Arrange
            var request = new UserConsumePointsRequst
            {
                UserID = "user",
                Receipt = new List<ProductConsumeRequest>
                {
                    new ProductConsumeRequest { ProductId = 1, Points = 10, Co2PerKg = 1.2f, QuantityKg = 2.5f, Price = 5.0f }
                }
            };

            // Kreiraj instancu endpointa sa mock DB
            var endpoint = new UserConsumePoints(_db);

            // Act
            var result = await endpoint.HandleAsync(request);

            // Assert
            Assert.True(result > 0);
            Assert.Equal(27, result);
        }
    }
}
