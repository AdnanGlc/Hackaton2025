using backend.Helpers.API;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints.UserEndpoints
{
    public class UserGetAviableRecepies(ApplicationDb db) : EndpointBaseAsync
        .WithRequest<string>
        .WithResult<AviableReciepesResponse[]>
    {
        [HttpGet] 
        public override async Task<AviableReciepesResponse[]> HandleAsync(string request, CancellationToken cancellationToken = default)
        {
            List<AviableReciepesResponse> aviableReciepes = new List<AviableReciepesResponse>();
            var userProduct = db.UserProducts.Where(up=>up.UserId == request).Select(up=>up.ProiductId).Distinct().Order();
            var recipes = db.Recipes.Include(r=>r.User);
            foreach(var recipe in recipes)
            {
                var products = recipe.RecipeProducts.Select(up=>up.ProductId).Distinct().Order();

                if (products.Count() > userProduct.Count()) continue;
                bool flag = true;
                for(int i = 0;i<Math.Min(userProduct.Count(), products.Count());i++)
                    if (userProduct.ElementAt(i) != products.ElementAt(i))
                        flag = false;

                if (flag)
                    aviableReciepes.Add(new AviableReciepesResponse { 
                        Id = recipe.Id,
                        Name = recipe.Name,
                        Description = recipe.Description,
                        Image =recipe.Image,
                        User = recipe.User.UserName!,
                        RecipeProducts = (List<RecipeProduct>)recipe.RecipeProducts
                    });
            }
            return aviableReciepes.ToArray();
        }
    }
    public class AviableReciepesResponse
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string Image { get; set; } = null!;

        public string User { get; set; }

        public virtual List<RecipeProduct> RecipeProducts { get; set; }
    }
}

