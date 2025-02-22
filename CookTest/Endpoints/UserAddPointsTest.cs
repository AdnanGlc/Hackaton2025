using backend.Endpoints.UserEndpoints;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookTest.Endpoints
{
    public class UserAddPointsTest
    {
        private readonly ApplicationDb _db;

        public UserAddPointsTest()
        {
            var options = new DbContextOptionsBuilder<ApplicationDb>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            _db = new ApplicationDb(options);

            // Dodaj testnog korisnika u InMemory bazu
            _db.Users.Add(new User { Id = "user", Points = 100 });
            _db.SaveChanges();
        }

        [Fact]
        public async Task HandleAsync_Should_Add_Points_When_User_Buy()
        {
            //Arrange
            var request = new UserAddPointsRequst
            {
                UserID = "user",
                Receipt = new List<ProductAddRequest>
                {
                    new ProductAddRequest { ProductId = 1, Points = 10, Co2PerKg = 1.2f, QuantityKg = 2.5f}
                }
            };

            //Act

            var endpoint = new UserAddPoints(_db);

            // Act
            var result = await endpoint.HandleAsync(request);

            //Assert
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == "user");
            Assert.Equal(25, result); 
            Assert.NotNull(user); 
            Assert.Equal(125, user.Points); 
        }
    }
}
