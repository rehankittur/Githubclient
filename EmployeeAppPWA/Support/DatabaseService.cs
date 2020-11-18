using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Unite.Students.Integration.EmployeeAppService.DataAccess;
using Unite.Students.Integration.EmployeeAppService.Models;

namespace Unite.Students.Integration.EmployeeAppService.Support
{
    public class DatabaseService : Unite.Students.Integration.EmployeeAppService.Support.IDatabaseService
    {
        IConfiguration _configuration;
        private readonly ILogger<EmployeeService> _logger;
        private readonly SqlDbContext _sqlDbContext;
        public DatabaseService(IConfiguration configuration, ILogger<EmployeeService> logger, SqlDbContext sqlDbContext)
        {
            _logger = logger;
            _configuration = configuration;
            _sqlDbContext = sqlDbContext;
        }

        public string DbExists()
        {
            try
            {
                return "DB is Healthy ==> "+_sqlDbContext.Database.CanConnect();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error: DbExists Query: " + ex.Message.ToString());
                throw new Exception("Error DB Check ===> "+ex.Message.ToString(), ex);
            }
        }

        public V2_Checkin GetBookingSlot(string customerId, string bookingRef)
        {
            try
            {
                _logger.LogInformation("Started: GetBookingSlot Query: " + customerId + ":" + bookingRef);

                var bookingSlot = _sqlDbContext.V2_Checkins
                                            .Where(c => c.CustomerId == customerId && c.BookingRef == bookingRef).ToList();
                
                if(bookingSlot.Count > 0)
                    return bookingSlot.ElementAt(0);
                return null;
            }
            catch(Exception ex)
            {
                _logger.LogError("Error: GetBookingSlot Query: " + ex.Message.ToString());
                throw new Exception(ex.Message.ToString(), ex);
            }
        }

        public V2_PhotoId GetPhotoIdDetails(string customerId, string bookingRef)
        {
            try
            {
                _logger.LogInformation("Started: GetPhotoIdDetails Query: " + customerId + ":" + bookingRef);
               var photoDetails = _sqlDbContext.V2_PhotoIds
                                            .Where(c => c.BookingRef == bookingRef).ToList(); ;
                _logger.LogInformation("Ended: GetPhotoIdDetails Query: " + photoDetails.Count());

                if (photoDetails.Count > 0)
                    return photoDetails.ElementAt(0);
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error: GetPhotoIdDetails Query: " + ex.Message.ToString());
                throw new Exception(ex.Message.ToString(), ex);
            }
        }
    }
}
