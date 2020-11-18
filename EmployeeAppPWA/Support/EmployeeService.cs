//-----------------------------------------------------------------------
// <copyright file="IEmployeeService.cs" company="UNITE Group PLC">
// Copyright (c) UNITE Group PLC. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Unite.Students.Integration.EmployeeAppService.Support
{
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Logging;
    using Microsoft.OData.Edm;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;
    using Unite.Students.Integration.EmployeeAppService.Helper;
    using Unite.Students.Integration.EmployeeAppService.Models;

    /// <summary>
    /// the employee service interface
    /// </summary>
    public class EmployeeService : Unite.Students.Integration.EmployeeAppService.Support.IEmployeeService
    {
        IConfiguration _configuration;
        private readonly ILogger<EmployeeService> _logger;
        public const string COMPLETED = "COMPLETED";
        public string Host { get; set; }
        public string GetCustomres { get; set; }
        public string GetBookings { get; set; }
        public string PutBookingCheckin { get; set; }
        public string PutBookingCheckinWithBookingInstanceOccupierId { get; set; }
        public EmployeeService(IConfiguration configuration, ILogger<EmployeeService> logger)
        {
            _logger = logger;
            _configuration = configuration;
            Host = _configuration["PadService:Host"];
            GetCustomres = _configuration["PadService:GetCustomres"];
            GetBookings = _configuration["PadService:GetBookings"];
            PutBookingCheckin = _configuration["PadService:PutBookingCheckin"];
            PutBookingCheckinWithBookingInstanceOccupierId = _configuration["PadService:PutBookingCheckinWithBookingInstanceOccupierId"];
        }

        public string GetPrismToken(string cookieToken)
        {
            _logger.LogInformation("Started Token Parsing for Prism Header");
            var tokenstr = cookieToken.Split(';');
            var token = tokenstr[0].ToString().Split('=');
            var prismToken = token[1].ToString();
            _logger.LogInformation("Ended Token Parsing for Prism Header: Token ==>> "+ prismToken);
            return prismToken;
        }
        
        public async Task<string> PostURI(Uri uri, HttpContent httpContent)
        {
            var response = string.Empty;
            using (var client = new HttpClient())
            {
                HttpResponseMessage result = await client.PostAsync(uri, httpContent);
                if (result.IsSuccessStatusCode)
                {
                    response = await result.Content.ReadAsStringAsync();
                }
                else
                {
                    return string.Empty;
                }
            }
            return response;
        }
        public async Task<string> GetURI(HttpRequestMessage httpContent)
        {
            var response = string.Empty;
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Accept", "application/json");
                HttpResponseMessage result = await client.SendAsync(httpContent);
                if (result.IsSuccessStatusCode)
                {
                    response = await result.Content.ReadAsStringAsync();
                }
                else
                {
                    return string.Empty;
                }
            }
            return response;
        }

        public async Task<string> PutURI(Uri uri, HttpContent httpContent)
        {
            var response = string.Empty;
            using (var client = new HttpClient())
            {
                HttpResponseMessage result = await client.PutAsync(uri, httpContent);
                if (result.IsSuccessStatusCode)
                {
                    response = await result.Content.ReadAsStringAsync();
                }
                else
                {
                    return Convert.ToString(HelperUtils.StatusType.ERROR);
                }
            }
            return response;
        }

        public async Task<CheckinBooking> PutCheckinBooking(string bookingId, string cookieToken)
        {
            try
            {
                _logger.LogInformation("Started PutCheckinBooking");
                var url = $"{Host}{PutBookingCheckin}";
                var prismToken = GetPrismToken(cookieToken);
                Uri uri = new Uri(url.Replace("{booking-id}", bookingId)); 
                HttpContent httpContent = new StringContent("{}", Encoding.UTF8, "application/json");
                httpContent.Headers.Add("Cookie", cookieToken);
                httpContent.Headers.Add("Prism-Csrf", prismToken);
                _logger.LogInformation("PutCheckinBooking Request Initiated");
                var result = await PutURI(uri, httpContent);
                _logger.LogInformation("PutCheckinBooking Request Ended");
                if (result != Convert.ToString(HelperUtils.StatusType.ERROR))
                {
                    CheckinBooking _checkinBooking = Newtonsoft.Json.JsonConvert.DeserializeObject<CheckinBooking>(result);
                    return _checkinBooking;
                }
                throw new Exception("Invalid Booking Id or Booking already processed: "+bookingId);
            }
            catch (Exception ex)
            {
                _logger.LogError("PutCheckinBooking ===> " + ex.Message.ToString());
                throw new Exception(ex.Message.ToString(), ex);
            }
        }
        public async Task<string> CheckinPutBookingInstanceOccupierId(string bookingId, string instanceId, string occupierId, string cookieToken)
        {
            try
            {
                _logger.LogInformation("Started CheckinPutBookingInstanceOccupierId");
                var url = $"{Host}{PutBookingCheckinWithBookingInstanceOccupierId}";
                var prismToken = GetPrismToken(cookieToken);
                Uri uri = new Uri(string.Format(url, bookingId, instanceId, occupierId));
                HttpContent httpContent = new StringContent("{}", Encoding.UTF8, "application/json");
                httpContent.Headers.Add("Cookie", cookieToken);
                httpContent.Headers.Add("Prism-Csrf", prismToken);
                _logger.LogInformation("Put CheckinPutBookingInstanceOccupierId Request Initiated");
                var result = await PutURI(uri, httpContent);
                _logger.LogInformation("Put CheckinPutBookingInstanceOccupierId Request Ended");
                if (result != Convert.ToString(HelperUtils.StatusType.ERROR))
                {
                    return "Ok";
                }
               throw new Exception("Invalid Booking Id or Booking already processed: bookingId: " + bookingId+ " instanceId: "+ instanceId+ "  occupierId: "+ occupierId);
            }
            catch (Exception ex)
            {
                _logger.LogError("CheckinPutBookingInstanceOccupierId ===> " + ex.Message.ToString());
                throw new Exception(ex.Message.ToString(), ex);
            }
        }
        public async Task<Booking> GetBookingInfo(string customerId, string cookieToken)
        {
            try
            {
                _logger.LogInformation("Started GetBookingInfo");
                var url = $"{Host}{GetBookings}";
                var prismToken = GetPrismToken(cookieToken);
                Uri uri = new Uri(url);
                var payload = "{\"q\": \"number:"+ customerId + "\"}";
                HttpContent httpContent = new StringContent(payload, Encoding.UTF8, "application/json");
                httpContent.Headers.Add("Cookie", cookieToken);
                httpContent.Headers.Add("Prism-Csrf", prismToken);
                _logger.LogInformation("Post Request Initiated: "+ customerId);
                var result = await PostURI(uri, httpContent);
                _logger.LogInformation("Post Request Ended: "+ customerId);
                Booking booking = Newtonsoft.Json.JsonConvert.DeserializeObject<Booking>(result);
                if (booking.content.Count == 0)
                {
                    _logger.LogError("Booking not found for Customer: " + customerId);
                    throw new Exception("Booking not found for Customer: "+ customerId);
                }
                return booking;
            }
            catch (Exception ex)
            {
                _logger.LogError("GetBookingInfo ===> "+ex.Message.ToString());
                throw new Exception(ex.Message.ToString(), ex);
            }
        }

        public DateTime ConvertEpochToReadableFormat(string date)
        {
            DateTime dt = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            double d = double.Parse(date);
            DateTime _tempDate = dt.AddMilliseconds(d);
            return _tempDate;
        }
        public bool CompareStartDate(string startDate, string endDate)
        {
            DateTime _tempStartDate = ConvertEpochToReadableFormat(startDate);
            DateTime _tempEndDate = ConvertEpochToReadableFormat(endDate);
            DateTime Today = DateTime.Now;
            int startValue = DateTime.Compare(Today, _tempStartDate);
            int endValue = DateTime.Compare(Today, _tempEndDate);
            if (startValue > 0 && endValue < 0)
                return true;
            else if (startValue < 0 || endValue > 0)
                return false;
            return startValue == endValue;
        }
        public async Task<BookingResponse> GetBookingList(Booking booking, string cookieToken)
        {
            try
            {
                if (booking.content.Count == 1)
                {
                    BookingContent bookingContent = booking.content.ElementAt<BookingContent>(0);
                    _logger.LogInformation("Booking Found: " + bookingContent.id);
                    var url = $"{Host}{GetCustomres}";
                    var uriBuilder = new UriBuilder(url + bookingContent.id);
                    var client = new HttpClient();
                    var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, uriBuilder.ToString());
                    httpRequestMessage.Headers.Add("Cookie", cookieToken);
                    _logger.LogInformation("Booking Requested: " + bookingContent.id);
                    var result = await GetURI(httpRequestMessage);
                    _logger.LogInformation("Booking Fetched: " + bookingContent.id);
                    Customer customer = Newtonsoft.Json.JsonConvert.DeserializeObject<Customer>(result);
                    if (customer.bookings.Count == 0)
                    {
                        _logger.LogError("Booking not found for Booking Reference ID : " + bookingContent.id);
                        throw new Exception("Booking not found for Booking Reference ID : " + bookingContent.id);
                    }
                    else
                    {
                        List<CustomerBooking> customerBooking = customer.bookings.Where(x => x.status == COMPLETED && CompareStartDate(x.startDate, x.endDate) == true && Enum.IsDefined(typeof(HelperUtils.BookingType), x.bookingType)).ToList<CustomerBooking>();
                        if (customerBooking.Count == 0)
                        {
                            _logger.LogError("No record found for Status COMPLETED booking Id: "+ bookingContent.id);
                            throw new Exception("No record found for Status COMPLETED booking Id: " + bookingContent.id);
                        }
                        else if (customerBooking.Count > 1)
                        {
                            throw new Exception("More than one booking completed Records Exists: "+ customerBooking.Count);
                        }
                        CustomerBooking _tempBooking = customerBooking.FirstOrDefault();
                        _logger.LogInformation("Succcess Booking");
                        double _tempAccountBalance;
                        bool isNumerical = double.TryParse(customer.accountBalance, out _tempAccountBalance);
                        return new BookingResponse()
                        {
                            id = _tempBooking.id,
                            customerId = customer.partyNumber,
                            firstName = customer.firstName,
                            lastName = customer.lastName,
                            accountBalance = isNumerical ? String.Format("{0:0.00}", _tempAccountBalance) : customer.accountBalance,
                            instanceId = _tempBooking.instanceId,
                            occupierId = _tempBooking.occupierId,
                            dateOfBirth = customer.dateOfBirth,
                            contractNumber = _tempBooking.contractNumber,
                            buildingName = _tempBooking.buildingName,
                            bookingType = _tempBooking.bookingType,
                            block = _tempBooking.block,
                            floor = _tempBooking.floor,
                            flatName = _tempBooking.flatName,
                            roomNumber = _tempBooking.roomNumber
                        };
                    }
                }
                else
                {
                    _logger.LogError("No Booking Record Found: "+ booking.content.Count);
                    throw new Exception("No Booking Record Found: "+ booking.content.Count);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("GetBookingList ===> " + ex.Message.ToString());
                throw new Exception(ex.Message.ToString(), ex);
            }
        }
    }
}
