using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Unite.Students.Integration.EmployeeAppService.Models
{
    public class Checkin
    {
        public int Id { get; set; }
        public string BookingRef { get; set; }
        public string CustomerId { get; set; }
        public DateTime? CheckinDate { get; set; }
        public string SlotBooked { get; set; }
        public string CheckedId { get; set; }
    }
}
