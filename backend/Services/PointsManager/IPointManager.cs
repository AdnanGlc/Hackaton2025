using backend.Models;
using Microsoft.Data.SqlClient.DataClassification;

namespace backend.Services.PointsManager
{
    public interface IPointManager
    {
        int UpdateUserPoints(User user,List<Product> receipt);
        void ConsumeUserPoints(User user, List<Product> receipt);
    }
}
