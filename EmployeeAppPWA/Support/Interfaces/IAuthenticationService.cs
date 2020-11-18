//-----------------------------------------------------------------------
// <copyright file="IAuthenticationServer.cs" company="UNITE Group PLC">
// Copyright (c) UNITE Group PLC. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Unite.Students.Integration.EmployeeAppService.Support
{
    using System;

    /// <summary>
    /// the authentication server interface
    /// </summary>
    public interface IAuthenticationService
    {
        /// <summary>
        /// authentication the customer
        /// </summary>
        /// <param name="username">the user name</param>
        /// <param name="password">the password</param>
        /// <returns>A task object representing the asynchronous operation.</returns>
        System.Threading.Tasks.Task<string> GetPadCookie();
    }
}
