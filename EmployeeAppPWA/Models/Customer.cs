using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Unite.Students.Integration.EmployeeAppService.Models
{
    public class Customer
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string dateOfBirth { get; set; }
        public string partyNumber { get; set; }
        public string accountBalance { get; set; }
        public List<CustomerBooking> bookings { get; set; }
    }

    public class CustomerBooking
    {
        public string id { get; set; }
        public string bookingType { get; set; }
        public string status { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
        public string instanceId { get; set; }
        public string occupierId { get; set; }
        public string ebsId { get; set; }
        public string contractNumber { get; set; }
        public string buildingName { get; set; }
        public string block { get; set; }
        public string floor { get; set; }
        public string flatName { get; set; }
        public string roomNumber { get; set; }
    }
}
