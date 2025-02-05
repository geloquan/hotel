
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
    [Route("API/WebAPI/ListController/Client")]   
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
                dateofbirth = dr["dateofbirth"] != DBNull.Value ? (SqlDateTime)dr["dateofbirth"] : SqlDateTime.Null
                
            };
        }
        dr.Close();
        myconnection.Close();
    }
}