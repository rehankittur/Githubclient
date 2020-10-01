//-----------------------------------------------------------------------
// <copyright file="IEmployeeService.cs" company="UNITE Group PLC">
// Copyright (c) UNITE Group PLC. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Unite.Students.Integration.EmployeeAppService.Support
{
    using System;
    using System.Collections.Generic;
    using Unite.Students.Integration.EmployeeAppService.Models;

    /// <summary>
    /// the employee service interface
    /// </summary>
    public interface IEmployeeService
    {
        System.Threading.Tasks.Task<BookingResponse> GetBookingList(Booking booking, string cookieToken);
        System.Threading.Tasks.Task<Booking> GetBookingInfo(string customerId, string cookieToken);
        System.Threading.Tasks.Task<CheckinBooking> PutCheckinBooking(string BookingRef, string cookieToken);
        System.Threading.Tasks.Task<string> CheckinPutBookingInstanceOccupierId(string bookingId, string instanceId, string occupierId, string cookieToken);
    }
}
