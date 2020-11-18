//-----------------------------------------------------------------------
// <copyright file="IEmployeeService.cs" company="UNITE Group PLC">
// Copyright (c) UNITE Group PLC. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Unite.Students.Integration.EmployeeAppService.Models;
namespace Unite.Students.Integration.EmployeeAppService.Support
{
    /**
     * Authentication Service is used accessing PAD api token on successful login
     * Once Set-Cookie fetched onSuccess this token later used for making other PAD calls
     * EmployeeLogin property used for login endpoint
    **/
    public class AuthenticationService : Unite.Students.Integration.EmployeeAppService.Support.IAuthenticationService
    {
        IConfiguration _configuration;
        private readonly ILogger<AuthenticationService> _logger;
        public string Host { get; set; }
        public string EmployeeLogin { get; set; }
        class AuthUser
        {
            public string username { get; set; }
            public string password { get; set; }
            public override string ToString()
            {
                return $"{username}: {password}";
            }
        }
        public AuthenticationService(IConfiguration configuration, ILogger<AuthenticationService> logger)
        {
            _logger = logger;
            _configuration = configuration;
            Host = _configuration["PadService:Host"];
            EmployeeLogin = _configuration["PadService:EmployeeLogin"];
        }
        public async Task<string> GetPadCookie()
        {
            try
            {
                _logger.LogInformation("GetPadCookie Initiated");
                var person = new AuthUser();
                person.username = _configuration["PadService:LoginUserName"];
                person.password = _configuration["PadService:LoginPassword"];

                var json = JsonConvert.SerializeObject(person);
                var data = new StringContent(json, Encoding.UTF8, "application/json");

                var url = $"{Host}{EmployeeLogin}";
                var client = new HttpClient();
                _logger.LogInformation("Started: GetPadCookie Login");
                var httpresponse = await client.PostAsync(url, data);
                _logger.LogInformation("Ended: GetPadCookie Login");
                string cookieToken = httpresponse.Headers.TryGetValues("Set-Cookie", out var values) ? values.FirstOrDefault() : null;
                string result = httpresponse.Content.ReadAsStringAsync().Result;
                return cookieToken;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error GetPadCookie ==> " + ex.Message.ToString());
                throw new Exception(ex.Message.ToString(), ex);
            }
        }
    }
}
