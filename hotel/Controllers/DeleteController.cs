using System.Data;
using System.Data.SqlTypes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Model;

[ApiController]
public class DeleteController : ControllerBase {
    SqlConnection myconnection;
    SqlCommand mycommand;
    
    
    [HttpPost]
    [Route("API/WEBAPI/DeleteController/DeleteClient")]   
    public string DeleteClient(Client client) {
        Console.WriteLine($"DeleteClient: {client}");
        try {
            myconnection = new SqlConnection(new GetConnection().PlsConnect());
            myconnection.Open();

            string sqlstatement = """
                DELETE FROM 
                    client 
                WHERE
                    id = @_id
            """;
            
            using (SqlCommand mycommand = new SqlCommand(sqlstatement, myconnection)) {
                mycommand.Parameters.AddWithValue("@_id", client.id);
                
                int rowsAffected = mycommand.ExecuteNonQuery();
                return rowsAffected > 0 ? "Insert successful" : "Insert failed";
            }
        } catch (Exception ex) {
            return ex.Message;
        }
    }
}