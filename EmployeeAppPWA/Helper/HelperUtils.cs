using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Unite.Students.Integration.EmployeeAppService.Helper
{
    public class HelperUtils
    {
        public enum StatusType
        {
            SUCCESS,
            ERROR
        }

        public enum BookingType
        {
            DIRECT_LET,
            NOMS_REFER,
            STL,
            NOMS_3RD_PARTY
        }
    }
}
