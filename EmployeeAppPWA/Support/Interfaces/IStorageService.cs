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
    public interface IStorageService
    {
        System.Threading.Tasks.Task<string> GetPhotoUrlWithSasToken(string photoPath);
        System.Threading.Tasks.Task<string> HealthCheck();
        
    }
}
