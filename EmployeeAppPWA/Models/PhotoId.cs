using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Unite.Students.Integration.EmployeeAppService.Models
{
    public class PhotoId
    {
        public string PhotoIdPath { get; set; }
        public string PhotoIdType { get; set; }
        public string CustomerId { get; set; }
    }
}
