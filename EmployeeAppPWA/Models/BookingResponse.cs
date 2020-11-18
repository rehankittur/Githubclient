using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Unite.Students.Integration.EmployeeAppService.Models
{
    public class BookingResponse
    {
        private string _accountBalance;
        public string accountBalance
        {
            get { return _accountBalance ?? string.Empty; }
            set { _accountBalance = value ?? string.Empty; }
        }
        private string _id;
        public string id
        {
            get { return _id ?? string.Empty; }
            set { _id = value ?? string.Empty; }
        }
        private string _bookingType;
        public string bookingType
        {
            get { return _bookingType ?? string.Empty; }
            set { _bookingType = value ?? string.Empty; }
        }
        private string _customerId;
        public string customerId
        {
            get { return _customerId ?? string.Empty; }
            set { _customerId = value ?? string.Empty; }
        }
        private string _firstName;
        public string firstName
        {
            get { return _firstName ?? string.Empty; }
            set { _firstName = value ?? string.Empty; }
        }
        private string _lastName;
        public string lastName
        {
            get { return _lastName ?? string.Empty; }
            set { _lastName = value ?? string.Empty; }
        }
        private string _dateOfBirth { get; set; }
        public string dateOfBirth
        {
            get { return _dateOfBirth ?? string.Empty; }
            set { _dateOfBirth = value ?? string.Empty; }
        }
        private string _contractNumber;
        public string contractNumber
        {
            get { return _contractNumber ?? string.Empty; }
            set { _contractNumber = value ?? string.Empty; }
        }
        private string _buildingName;
        public string buildingName
        {
            get { return _buildingName ?? string.Empty; }
            set { _buildingName = value ?? string.Empty; }
        }
        private string _block;
        public string block
        {
            get { return _block ?? string.Empty; }
            set { _block = value ?? string.Empty; }
        }
        private string _floor;
        public string floor
        {
            get { return _floor ?? string.Empty; }
            set { _floor = value ?? string.Empty; }
        }
        private string _flatName;
        public string flatName
        {
            get { return _flatName ?? string.Empty; }
            set { _flatName = value ?? string.Empty; }
        }
        private string _roomNumber { get; set; }
        public string roomNumber
        {
            get { return _roomNumber ?? string.Empty; }
            set { _roomNumber = value ?? string.Empty; }
        }
        private string _checkinDate { get; set; }
        public string checkinDate
        {
            get { return _checkinDate ?? string.Empty; }
            set { _checkinDate = value ?? string.Empty; }
        }
        private string _checkinTime { get; set; }
        public string checkinTime
        {
            get { return _checkinTime ?? string.Empty; }
            set { _checkinTime = value ?? string.Empty; }
        }
        private string _photoIdPath;
        public string photoIdPath
        {
            get { return _photoIdPath ?? string.Empty; }
            set { _photoIdPath = value ?? string.Empty; }
        }
        private string _instanceId;
        public string instanceId
        {
            get { return _instanceId ?? string.Empty; }
            set { _instanceId = value ?? string.Empty; }
        }
        private string _occupierId;
        public string occupierId
        {
            get { return _occupierId ?? string.Empty; }
            set { _occupierId = value ?? string.Empty; }
        }
    }
}
