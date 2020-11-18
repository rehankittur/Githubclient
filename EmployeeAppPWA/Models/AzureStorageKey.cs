using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Unite.Students.Integration.EmployeeAppService.Models
{
    public class AzureStorageKey
    {
        public readonly static string MEMORY_CACHE_KEY = "AzureKeyEmployee";
        public readonly static string STORAGE_ACCOUNT_NAME = "storageAccountName";
        public readonly static string STORAGE_ACCOUNT_KEY = "DigitalCheckinStorageAccountKey";
        public readonly static string STORAGE_CONTAINER_NAME = "storageBlobContainerName";
    }
}
