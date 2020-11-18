using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Unite.Students.Integration.EmployeeAppService.DataAccess;
using Unite.Students.Integration.EmployeeAppService.Models;

namespace Unite.Students.Integration.EmployeeAppService.Support
{
    public class StorageService : Unite.Students.Integration.EmployeeAppService.Support.IStorageService
    {
        IConfiguration _configuration;
        private readonly ILogger<StorageService> _logger;
        private readonly IMemoryCache _memoryCache;
        private DefaultAzureCredential _credentials;
        private string KeyVaultUri { get; set; }
        
        public StorageService(IConfiguration configuration, ILogger<StorageService> logger, IMemoryCache memoryCache)
        {
            _logger = logger;
            _configuration = configuration;
            _memoryCache = memoryCache;
            _credentials = new DefaultAzureCredential();
            KeyVaultUri = _configuration["BlobStorage:KeyVaultUri"];
        }
        private async Task<AzureStorage> GetKeyFromCache()
        {
            _logger.LogInformation("GetKeyFromCache Started");
            AzureStorage azureStorage;
            if(!_memoryCache.TryGetValue(AzureStorageKey.MEMORY_CACHE_KEY, out azureStorage))
            {
                azureStorage = await GetKeyVault();
                _logger.LogInformation("KeyValut Cache Started");
                _memoryCache.Set(AzureStorageKey.MEMORY_CACHE_KEY, azureStorage);
                _logger.LogInformation("KeyValut Cache Completed");
            }
            _logger.LogInformation("Fetching KeyValut Information from Cache Started");
            azureStorage = _memoryCache.Get(AzureStorageKey.MEMORY_CACHE_KEY) as AzureStorage;
            _logger.LogInformation("Fetching KeyValut Information from Cache Completed");
            return azureStorage;
        }
        public async Task<string> GetPhotoUrlWithSasToken(string photoPath)
        {
            _logger.LogInformation("GetPhotoUrlWithSasToken PhotoPath: "+ photoPath);
            AzureStorage storage = await GetKeyFromCache();
            if(!string.IsNullOrEmpty(photoPath) && photoPath.IndexOf(storage.STORAGE_CONTAINER_NAME) != -1)
            {
                string blobName = photoPath.Split(storage.STORAGE_CONTAINER_NAME + "/")[1];
                _logger.LogInformation("GetPhotoUrlWithSasToken Generating Token: " + photoPath);
                string sasToken = GenerateSasToken(storage.STORAGE_CONTAINER_NAME, blobName, storage.STORAGE_ACCOUNT_NAME, storage.STORAGE_ACCOUNT_KEY);
                _logger.LogInformation("GetPhotoUrlWithSasToken Generating Token Success: " + photoPath);
                return photoPath + "?" + sasToken;
            }
            _logger.LogError("GetPhotoUrlWithSasToken Invalid Photo URL: " + photoPath+" : "+ storage.STORAGE_CONTAINER_NAME);
            return "";
        }
        private string GenerateSasToken(string containerName, string blobName, string accountName, string accountKey)
        {
            try
            {
                _logger.LogInformation("GenerateSasToken Started: "+ containerName+" : "+ blobName);
                StorageSharedKeyCredential key = new StorageSharedKeyCredential(accountName, accountKey);
                BlobSasBuilder sasBuilder = new BlobSasBuilder()
                {
                    BlobContainerName = containerName,
                    BlobName = blobName,
                    Resource = "b",
                    StartsOn = DateTimeOffset.UtcNow,
                    ExpiresOn = DateTimeOffset.UtcNow.AddMinutes(15)
                };
                _logger.LogInformation("GenerateSasToken Setting Permisison: " + containerName + " : " + blobName);
                sasBuilder.SetPermissions(BlobSasPermissions.Read);
                //generate a signed SAS token using the user-delegation key
                string sasToken = sasBuilder.ToSasQueryParameters(key).ToString();
                _logger.LogInformation("GenerateSasToken Success ==> " + sasToken);
                return sasToken;
            }
            catch (Exception ex)
            {
                _logger.LogError("GenerateSasToken ==> " + ex.Message.ToString());
                throw new Exception(ex.Message.ToString(), ex);
            }
        }

        private async Task<AzureStorage> GetKeyVault()
        {
            try
            {
                _logger.LogInformation("GetKeyVault ==> Started");
                AzureStorage azureStorage = new AzureStorage();
                string url = string.Format(KeyVaultUri, Environment.GetEnvironmentVariable("keyVaultName"));
                _logger.LogInformation("GetKeyVault URL ==> "+url);
                var secretClient = new SecretClient(
                    new Uri(url), _credentials);
                _logger.LogInformation("Fetching Started ==> " + AzureStorageKey.STORAGE_ACCOUNT_KEY);
                var accountKey = await secretClient.GetSecretAsync(AzureStorageKey.STORAGE_ACCOUNT_KEY);
                azureStorage.STORAGE_ACCOUNT_KEY = accountKey.Value.Value;
                _logger.LogInformation("Fetching Completed ==> " + AzureStorageKey.STORAGE_ACCOUNT_KEY);
                _logger.LogInformation("Fetching Started ==> " + AzureStorageKey.STORAGE_ACCOUNT_NAME);
                var accountName = await secretClient.GetSecretAsync(AzureStorageKey.STORAGE_ACCOUNT_NAME);
                azureStorage.STORAGE_ACCOUNT_NAME = accountName.Value.Value;
                _logger.LogInformation("Fetching Completed ==> " + AzureStorageKey.STORAGE_ACCOUNT_NAME);
                _logger.LogInformation("Fetching Started ==> " + AzureStorageKey.STORAGE_CONTAINER_NAME);
                var storageContainer = await secretClient.GetSecretAsync(AzureStorageKey.STORAGE_CONTAINER_NAME);
                azureStorage.STORAGE_CONTAINER_NAME = storageContainer.Value.Value;
                _logger.LogInformation("Fetching Completed ==> " + AzureStorageKey.STORAGE_CONTAINER_NAME);
                _logger.LogInformation("GetKeyVault ==> Ended");
                return azureStorage;
            }
            catch(Exception ex)
            {
                _logger.LogError("GetKeyVault Error ==> " + ex.Message.ToString());
                throw new Exception(ex.Message.ToString(), ex);
            }
        }

        public async Task<string> HealthCheck()
        {
            try
            {
                string url = string.Format(KeyVaultUri, Environment.GetEnvironmentVariable("keyVaultName"));
                _logger.LogInformation("HealthCheck Started ==> "+ url);
                var secretClient = new SecretClient(
                    new Uri(url), _credentials);
                var healthCheck = await secretClient.GetSecretAsync("healthCheck");
                _logger.LogInformation("HealthCheck Completed ==> " + url);
                return healthCheck.Value.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError("HealthCheck Error ==> " + ex.Message.ToString());
                throw new Exception(ex.Message.ToString(), ex);
            }
        }
    }
}
