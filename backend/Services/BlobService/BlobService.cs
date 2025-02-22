using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace backend.Services
{
    public class BlobService : IBlobService
    {
        private readonly BlobContainerClient _blobContainerClient;

        public BlobService(string containerName)
        {
            var blobServiceClient = new BlobServiceClient("DefaultEndpointsProtocol=https;AccountName=euniversitystorage;AccountKey=F2wrsLZmLPVbTZrc3oc86zDmYzO8+KQEbA0AoteigidUILvXzK5pz8ZMaX8RRxyODjAfsCq0YQ+k+ASt5xgv3Q==;EndpointSuffix=core.windows.net");
            _blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);
        }

        public async Task<string> UploadFileAsync(IFormFile file)
        {
            var blobClient = _blobContainerClient.GetBlobClient(file.FileName);

            await using var stream = file.OpenReadStream();
            await blobClient.UploadAsync(stream, true);

            return blobClient.Uri.ToString();
        }

        public async Task<Stream> DownloadFileAsync(string fileName)
        {
            var file = _blobContainerClient.GetBlobClient(fileName);
            if (!await file.ExistsAsync())
                throw new FileNotFoundException($"File '{fileName}' does not exist in the blob storage.");
            var content = await file.DownloadContentAsync();
            Stream blobContent = content.Value.Content.ToStream();
            return blobContent;
        }
        public async Task<string> UploadFileFromStreamAsync(IFormFile File)
        {
            var blobClient = _blobContainerClient.GetBlobClient(File.FileName);
            await blobClient.UploadAsync(File.OpenReadStream(), new BlobHttpHeaders { ContentType = Path.GetExtension(File.FileName) });
            return File.FileName;
        }
        public async Task<bool> DeleteFileAsync(string fileName)
        {
            var blobClient = _blobContainerClient.GetBlobClient(fileName);
            return await blobClient.DeleteIfExistsAsync();
        }
    }
}
