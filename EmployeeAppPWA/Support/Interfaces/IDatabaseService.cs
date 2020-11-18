using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Unite.Students.Integration.EmployeeAppService.DataAccess;
using Unite.Students.Integration.EmployeeAppService.Models;

namespace Unite.Students.Integration.EmployeeAppService.Support
{
    public interface IDatabaseService
    {
        string DbExists();
        V2_Checkin GetBookingSlot(string customerId, string bookingRef);
        V2_PhotoId GetPhotoIdDetails(string customerId, string bookingRef);
    }
}
