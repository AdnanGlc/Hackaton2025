using backend.Helpers.API;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Endpoints.DataSeed
{
    public class DataSeedEndpoint(ApplicationDb db) : EndpointBaseAsync
        .WithoutRequest
        .WithoutResult
    {
        [HttpPost]
        [AllowAnonymous]
        public override async Task HandleAsync(CancellationToken cancellationToken = default)
        {
            if (db.Products.Any()) throw new Exception("Data exists, only use data seed on empty database");

            var product1 = new Product { Co2PerKg = 0.7, Name = "Potato", QuantityKg = 1, Points = 15, Price = 1.2m };
            db.Add(product1);
            var product2 = new Product { Co2PerKg = 0.3, Name = "Carrot", QuantityKg = 1, Points = 18, Price = 0.9m };
            db.Add(product2);

            var product3 = new Product { Co2PerKg = 0.5, Name = "Apple", QuantityKg = 1, Points = 16, Price = 1.5m };
            db.Add(product3);

            var product4 = new Product { Co2PerKg = 0.2, Name = "Onion", QuantityKg = 1, Points = 20, Price = 0.8m };
            db.Add(product4);

            var product5 = new Product { Co2PerKg = 0.8, Name = "Peas", QuantityKg = 1, Points = 14, Price = 2.0m };
            db.Add(product5);

            var product6 = new Product { Co2PerKg = 0.6, Name = "Lentils", QuantityKg = 1, Points = 15, Price = 1.8m };
            db.Add(product6);

            var product7 = new Product { Co2PerKg = 0.4, Name = "Zucchini", QuantityKg = 1, Points = 17, Price = 1.3m };
            db.Add(product7);

            var product8 = new Product { Co2PerKg = 0.5, Name = "Spinach", QuantityKg = 1, Points = 16, Price = 2.5m };
            db.Add(product8);

            var product9 = new Product { Co2PerKg = 1.0, Name = "Banana", QuantityKg = 1, Points = 12, Price = 1.6m };
            db.Add(product9);

            var product10 = new Product { Co2PerKg = 0.7, Name = "Wheat Flour", QuantityKg = 1, Points = 14, Price = 1.0m };
            db.Add(product10);

            var product11 = new Product { Co2PerKg = 0.3, Name = "Cabbage", QuantityKg = 1, Points = 18, Price = 0.7m };
            db.Add(product11);

            var product12 = new Product { Co2PerKg = 25.0, Name = "Beef", QuantityKg = 1, Points = 2, Price = 12.0m };
            db.Add(product12);

            var product13 = new Product { Co2PerKg = 22.0, Name = "Lamb", QuantityKg = 1, Points = 3, Price = 14.0m };
            db.Add(product13);

            var product14 = new Product { Co2PerKg = 10.0, Name = "Cheese", QuantityKg = 1, Points = 5, Price = 8.5m };
            db.Add(product14);

            var product15 = new Product { Co2PerKg = 3.0, Name = "Rice", QuantityKg = 1, Points = 8, Price = 1.5m };
            db.Add(product15);

            var product16 = new Product { Co2PerKg = 4.0, Name = "Chicken", QuantityKg = 1, Points = 10, Price = 6.0m };
            db.Add(product16);

            var product17 = new Product { Co2PerKg = 1.5, Name = "Eggs", QuantityKg = 1, Points = 11, Price = 2.8m };
            db.Add(product17);

            var product18 = new Product { Co2PerKg = 15.0, Name = "Chocolate", QuantityKg = 1, Points = 4, Price = 3.5m };
            db.Add(product18);

            var product19 = new Product { Co2PerKg = 0.9, Name = "Oat Milk", QuantityKg = 1, Points = 13, Price = 2.2m };
            db.Add(product19);

            var product20 = new Product { Co2PerKg = 6.0, Name = "Pork", QuantityKg = 1, Points = 7, Price = 7.0m };
            db.Add(product20);
            await db.SaveChangesAsync();
            var user = new User { Email = "johndoe@edu.fit.ba", PasswordHash = "johndoe123" };
            db.Users.Add(user);
            await db.SaveChangesAsync();

            //// 1.Zobena kaša s jabukom i bananom
            //var recipe1 = new Recipe
            //{
            //    Name = "Oatmeal with Apple and Banana",
            //    Description = "Warm oatmeal topped with chopped apple and banana, drizzled with oat milk.",
            //    UserId = "d70a2b17-b56f-479d-baad-08b8307447c2",
            //    Image = "https://www.slikomania.ba/fotky6702/fotos/CWF1930ME1.jpg"

            //};
            //db.Recipes.Add(recipe1);

            //// 2. Juha od leće i mrkve
            //var recipe2 = new Recipe
            //{
            //    Name = "Lentil and Carrot Soup",
            //    Description = "A hearty soup with lentils, carrots, onions, and potatoes.",
            //    UserId = 1,

            //};
            // db.Recipes.Add(recipe2);

            // // 3. Salata od špinata i graška
            // var recipe3 = new Recipe
            // {
            //     Name = "Spinach and Pea Salad",
            //     Description = "Fresh salad with young spinach, peas, and a touch of onion.",
            //     UserId = 1,

            // };
            // db.Recipes.Add(recipe3);

            // // 4. Tikvice s krumpirom na žaru
            // var recipe4 = new Recipe
            // {
            //     Name = "Grilled Zucchini and Potatoes",
            //     Description = "Roasted zucchini and potatoes with a sprinkle of spices.",
            //     UserId = 1
            // };
            // db.Recipes.Add(recipe4);

            // // 5. Kupus s mrkvom i jabukom
            // var recipe5 = new Recipe
            // {
            //     Name = "Cabbage, Carrot, and Apple Slaw",
            //     Description = "Fresh slaw with shredded cabbage, carrot, and apple, lemon juice dressing.",
            //     UserId = 1,

            // };
            // db.Recipes.Add(recipe5);

            // // 6. Rižoto od graška i špinata
            // var recipe6 = new Recipe
            // {
            //     Name = "Pea and Spinach Risotto",
            //     Description = "Creamy risotto with peas and spinach, lightly seasoned.",
            //     UserId = 1,

            // };
            // db.Recipes.Add(recipe6);

            // // 7. Tjestenina s lećom
            // var recipe7 = new Recipe
            // {
            //     Name = "Pasta with Lentils",
            //     Description = "Pasta with a lentil sauce and sautéed onions.",
            //     UserId = 1,

            // };
            // db.Recipes.Add(recipe7);

            // // 8. Omlet s povrćem
            // var recipe8 = new Recipe
            // {
            //     Name = "Vegetable Omelette",
            //     Description = "Light omelette with zucchini and spinach.",
            //     UserId = 1,

            // };
            // db.Recipes.Add(recipe8);

            // // 9. Krumpir s bananom i orasima
            // var recipe9 = new Recipe
            // {
            //     Name = "Potato with Banana and Walnuts",
            //     Description = "Baked potatoes topped with banana and walnuts for a sweet twist.",
            //     UserId = 1,

            // };
            // db.Recipes.Add(recipe9);

            // // 10. Pileća juha s povrćem
            // var recipe10 = new Recipe
            // {
            //     Name = "Chicken Vegetable Soup",
            //     Description = "Classic chicken soup with carrots, onions, and potatoes.",
            //     UserId = 1,

            // };
            // db.Recipes.Add(recipe10);

           // await db.SaveChangesAsync(cancellationToken);
        }
    }
}
