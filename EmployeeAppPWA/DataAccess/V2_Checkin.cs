using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Unite.Students.Integration.EmployeeAppService.Models;

namespace Unite.Students.Integration.EmployeeAppService.DataAccess
{
    [Table("Checkin", Schema = "V2")]
    public class V2_Checkin : Checkin
    {
        public TimeSpan? CheckinTime { get; set; }
    }
}
