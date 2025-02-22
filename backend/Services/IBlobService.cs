using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace backend.Services
{
    public interface IBlobService
    {
        Task<string> UploadFileAsync(IFormFile file);
        Task<string> UploadFileFromStreamAsync(IFormFile file);
        Task<Stream> DownloadFileAsync(string fileName);
        Task<bool> DeleteFileAsync(string fileName);
    }
}
