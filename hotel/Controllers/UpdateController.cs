using System.Data;
using System.Data.SqlTypes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Model;

[ApiController]
public class UpdateController : ControllerBase {
    SqlConnection? myconnection;
    SqlCommand? mycommand;
    
    [HttpPut]
    [Route("API/WEBAPI/UpdateController/UpdateClient")]   
    public string UpdateClient(Client client) {
        Console.WriteLine($"UpdateClient: {client}");
        try{
            myconnection = new SqlConnection(new GetConnection().PlsConnect());
            myconnection.Open();

            string sqlstatement = """
                UPDATE 
                    dbo.client
                SET
                    name = @_name,
                    address = @_address,
                    dateofbirth = @_dateofbirth
                WHERE
                    id = @_id;
            """;
            
            using (SqlCommand mycommand = new SqlCommand(sqlstatement, myconnection)) {
                mycommand.Parameters.AddWithValue("@_id", client.id);
                mycommand.Parameters.AddWithValue("@_name", client.name);
                mycommand.Parameters.AddWithValue("@_address", client.address);
                mycommand.Parameters.AddWithValue("@_dateofbirth", client.dateofbirth);
                
                mycommand.ExecuteNonQuery();
                myconnection.Close();

                int rowsAffected = mycommand.ExecuteNonQuery();
                
                return rowsAffected > 0 ? client.ToString() : client.ToString();
            }

        } catch (Exception e) {
            return e.ToString();
        }
    }
}
