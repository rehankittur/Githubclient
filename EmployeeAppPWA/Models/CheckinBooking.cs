using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Unite.Students.Integration.EmployeeAppService.Models
{
    public class CheckinBooking
    {
        private string _id;
        public string id
        {
            get { return _id ?? string.Empty; }
            set { _id = value ?? string.Empty; }
        }
        private string _ebsId;
        public string ebsId
        {
            get { return _ebsId ?? string.Empty; }
            set { _ebsId = value ?? string.Empty; }
        }
        private string _contractNumber;
        public string contractNumber
        {
            get { return _contractNumber ?? string.Empty; }
            set { _contractNumber = value ?? string.Empty; }
        }
        private string _bookingType;
        public string bookingType
        {
            get { return _bookingType ?? string.Empty; }
            set { _bookingType = value ?? string.Empty; }
        }
        private string _status;
        public string status
        {
            get { return _status ?? string.Empty; }
            set { _status = value ?? string.Empty; }
        }
        private string _startDate;
        public string startDate
        {
            get { return _startDate ?? string.Empty; }
            set { _startDate = value ?? string.Empty; }
        }
    }
}
