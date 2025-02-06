using System.Data;
using System.Data.SqlTypes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Model;

[ApiController]
public class ListController : ControllerBase {
    SqlConnection? myconnection;
    SqlCommand? mycommand;
    SqlDataReader? dr;
     
    [HttpGet]
    [Route("API/WEBAPI/ListController/Client")]   
    public IEnumerable<Client> GetClients() {
        myconnection = new SqlConnection(new GetConnection().PlsConnect());
        myconnection.Open();

        string sqlstatement = """
            SELECT * FROM dbo.client
        """;

        mycommand = new SqlCommand(sqlstatement, myconnection);
        dr = mycommand.ExecuteReader();
        while (dr.Read()) {
            yield return new Client {
                id = dr["id"] != DBNull.Value ? (int?)dr["id"] : null,
                name = dr["name"].ToString() ?? "",
                address = dr["address"].ToString() ?? "",
                dateofbirth = dr["dateofbirth"] != DBNull.Value 
                    ? Convert.ToDateTime(dr["dateofbirth"]).ToString("yyyy-MM-dd") 
                    : ""
            };
        }
        dr.Close();
        myconnection.Close();
    }
    [HttpGet]
    [Route("API/WEBAPI/ListController/Rate")]
    public IEnumerable<Rate> GetRate() {
        myconnection = new SqlConnection(new GetConnection().PlsConnect());
        myconnection.Open();

        string sqlstatement = """
            SELECT * FROM dbo.rate
        """;

        mycommand = new SqlCommand(sqlstatement, myconnection);
        dr = mycommand.ExecuteReader();
        while (dr.Read()) {
            yield return new Rate {
                id = dr["id"] != DBNull.Value ? (int?)dr["id"] : null,
                minimum = (SqlMoney)(dr["minimum"] ?? 0.0M),
                maximum = (SqlMoney)(dr["maximum"]  ?? 0.0M),
                price = (SqlMoney)(dr["price"] ?? 0.0M)
            };
        }
        dr.Close();
        myconnection.Close();
    }
}