using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Unite.Students.Integration.EmployeeAppService.Models
{
    /// <summary>
    /// the Booking info details
    /// </summary>
    public class Booking
    {
        public List<BookingContent> content { get; set; }
    }

    public class BookingContent
    {
        public string numberOfRows { get; set; }
        public string id { get; set; }
        public string partyNumber { get; set; }
        public string lastName { get; set; }
        public string firstName { get; set; }
    }
}