using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Unite.Students.Integration.EmployeeAppService.DataAccess;
using Unite.Students.Integration.EmployeeAppService.Helper;
using Unite.Students.Integration.EmployeeAppService.Models;
using Unite.Students.Integration.EmployeeAppService.Support;

namespace Unite.Students.Integration.EmployeeAppService.Controllers
{
    /**
     * Employee Controller is used serving API's for EmployeeApp
     * Employee Controller having three Endpoints 
     * api/v1/employee/test ==>> Test if API is ready
     * api/v1/employee/db ==>> Test if DB connection is healthy
     * api/v1/employee/healthcheck ==>> Test if Azure KeyVault Connection is health
     * api/v1/employee/booking/{bookingId}/checkin ==> PUT request updating checkin status based on bookingId
     * api/v1/employee/customers/{customerId} ==> Fetches customer info based on customer Id
    **/
    [ApiController]
    [Route("api/v1/[controller]")]
    public class EmployeeController : ControllerBase
    {
        readonly IConfiguration _configuration;
        readonly IAuthenticationService _authService;
        readonly IEmployeeService _employeeService;
        readonly IDatabaseService _databaseService;
        readonly IStorageService _storageService;
        private readonly ILogger<EmployeeController> _logger;
        public EmployeeController(ILogger<EmployeeController> logger, 
            IEmployeeService employeeService, 
            IAuthenticationService authService, 
            IDatabaseService databaseService, 
            IStorageService storageService,
            IConfiguration configuration)
        {
            _configuration = configuration;
            _logger = logger;
            _employeeService = employeeService;
            _authService = authService;
            _databaseService = databaseService;
            _storageService = storageService;
        }
        [HttpGet]
        [Route("test")]
        public IActionResult EmployeeTestApi()
        {
            try {
                _logger.LogInformation("Test Api Route Invoked 1.2 !!");
                return Ok(new {
                    environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"),
                    message = "Employee: API is ready v1.2!"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError("Employee: API is not Ready ==> " + ex.Message.ToString());
               return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet]
        [Route("db")]
        public IActionResult EmployeeTestDb()
        {
            var dbInfo = string.Empty;
            try
            {
                dbInfo = _configuration.GetConnectionString("CheckinDb");
                if(dbInfo.IndexOf("Database") != -1)
                {
                    dbInfo = dbInfo.Split("Database")[0];
                }
                _logger.LogInformation("Db Check Initiated");
                return Ok(new
                {
                    db = dbInfo,
                    message = _databaseService.DbExists()
                });
            }
            catch (Exception ex)
            {
                _logger.LogError("Db Check Error ==> "+" : "+ dbInfo +" : " + ex.Message.ToString());
                return BadRequest(ex.Message.ToString() +" : "+ dbInfo);
            }
        }

        [HttpGet]
        [Route("healthcheck")]
        public async Task<IActionResult> HealthCheck()
        {
            try
            {
                _logger.LogInformation("HealthCheck Initiated");
                string healthCheck = await _storageService.HealthCheck();
                return Ok(new
                {
                    keyVault = Environment.GetEnvironmentVariable("keyVaultName"),
                    message = healthCheck
                });
            }
            catch (Exception ex)
            {
                _logger.LogError("HealthCheck Error ==> " + ex.Message.ToString());
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpPut]
        [Route("booking/{bookingId}/checkin")]
        public async Task<IActionResult> CheckinPut(string bookingId)
        {
            try
            {
                _logger.LogInformation("Start: Fetching Cookie Token");
                string cookieToken = await _authService.GetPadCookie();
                _logger.LogInformation("Ended: Fetching Cookie Token");
                _logger.LogInformation("Start: PutCheckinBooking");
                CheckinBooking checkingBooking = await _employeeService.PutCheckinBooking(bookingId, cookieToken);
                _logger.LogInformation("End: PutCheckinBooking");
                return Ok(checkingBooking);
            }
            catch (Exception ex)
            {
                _logger.LogError("CheckinPut Error ==> " + ex.Message.ToString());
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpPut]
        [Route("booking/{bookingId}/instance/{instanceId}/occupier/{occupierId}/checkin")]
        public async Task<IActionResult> CheckinPutBookingInstanceOccupierId(string bookingId,string instanceId, string occupierId)
        {
            try
            {
                _logger.LogInformation("Start: Fetching Cookie Token");
                string cookieToken = await _authService.GetPadCookie();
                _logger.LogInformation("Ended: Fetching Cookie Token");
                _logger.LogInformation("Start: CheckinPutBookingInstanceOccupierId");
                string checkingBooking = await _employeeService.CheckinPutBookingInstanceOccupierId(bookingId, instanceId, occupierId, cookieToken);
                _logger.LogInformation("End: CheckinPutBookingInstanceOccupierId");
                if(checkingBooking == "Ok") {
                    return Ok(new CheckinBooking());
                }
                return Ok(checkingBooking);
                
            }
            catch (Exception ex)
            {
                _logger.LogError("CheckinPutBookingInstanceOccupierId Error ==> " + ex.Message.ToString());
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet]
        [Route("customers/{customerId}")]
        public async Task<IActionResult> GetCustomers(string customerId)
        {
            try
            {
                _logger.LogInformation("Start: Fetching Cookie Token");
                string cookieToken = await _authService.GetPadCookie();
                _logger.LogInformation("Ended: Fetching Cookie Token");
                _logger.LogInformation("Start: Fetching Booking Info: " + customerId);
                Booking booking = await _employeeService.GetBookingInfo(customerId, cookieToken);
                _logger.LogInformation("End: Fetching Booking Info: " + customerId);
                _logger.LogInformation("Start: Fetching Customer Info: ");
                BookingResponse bookingResponse = await _employeeService.GetBookingList(booking, cookieToken);
                _logger.LogInformation("End: Fetching Customer Info: ");
                if(bookingResponse.bookingType != Convert.ToString(HelperUtils.BookingType.NOMS_3RD_PARTY))
                {
                    _logger.LogInformation("Start: Fetching Slot Info: ");
                    V2_Checkin bookingSlot = _databaseService.GetBookingSlot(customerId, bookingResponse.contractNumber);
                    if (bookingSlot != null)
                    {
                        bookingResponse.checkinDate = bookingSlot.CheckinDate?.ToString("yyyy-MM-dd");
                        bookingResponse.checkinTime = bookingSlot.CheckinTime?.ToString();
                    }
                    _logger.LogInformation("End: Fetching Slot Info: ");
                    _logger.LogInformation("Start: Fetching Photo Info: ");
                    V2_PhotoId photoDetails = _databaseService.GetPhotoIdDetails(customerId, bookingResponse.contractNumber);
                    if (photoDetails != null)
                    {
                        // string testPath = HttpUtility.UrlDecode("https://unitestorageaccount.blob.core.windows.net/unitecontainer/10074458%2FRN20000378_Regular.png");
                        bookingResponse.photoIdPath = !string.IsNullOrEmpty(photoDetails.PhotoIdPath) ? await _storageService.GetPhotoUrlWithSasToken(HttpUtility.UrlDecode(photoDetails.PhotoIdPath)) : "";
                        //bookingResponse.photoIdPath = !string.IsNullOrEmpty(photoDetails.PhotoIdPath) ? await _storageService.GetPhotoUrlWithSasToken(testPath) : "";
                    }
                    _logger.LogInformation("End: Fetching Photo Info: ");
                }
                else
                    _logger.LogInformation("NOMS_3RD_PARTY Found: "+ Convert.ToString(HelperUtils.BookingType.NOMS_3RD_PARTY));
                return Ok(bookingResponse);
            }
            catch (Exception ex)
            {
                _logger.LogError("GetCustomers Error ==> " + ex.Message.ToString());
                return BadRequest(ex.Message.ToString());
            }
        }
    }
}
