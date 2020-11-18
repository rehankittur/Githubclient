using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Unite.Students.Integration.EmployeeAppService.Models
{
    public class AzureStorage
    {
        public string STORAGE_ACCOUNT_NAME { get; set; }
        public string STORAGE_ACCOUNT_KEY { get; set; }
        public string STORAGE_CONTAINER_NAME { get; set; }
    }
}
