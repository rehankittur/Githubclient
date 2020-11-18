using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Unite.Students.Integration.EmployeeAppService.DataAccess
{
    public class SqlDbContext : DbContext
    {
        public string DataSource { get; set; }
        public SqlDbContext() { }
        public SqlDbContext(DbContextOptions<SqlDbContext> options):base(options)
        {}
        public DbSet<V2_Checkin> V2_Checkins { get; set; }
        public DbSet<V2_PhotoId> V2_PhotoIds { get; set; }
    }
    

    
}
