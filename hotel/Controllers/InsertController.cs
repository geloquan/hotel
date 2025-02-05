
using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Model;

[ApiController]
public class InsertController : ControllerBase {
    SqlConnection? myconnection;
    SqlCommand? mycommand;
    
    [HttpPut]
    [Route("API/WEBAPI/InsertController/InsertReservation")]
    public string InsertReservation(Reservation reservation) {
        try {
            myconnection = new SqlConnection(new GetConnection().PlsConnect());
            myconnection.Open();

            string sqlstatement = """
                INSERT INTO 
                    dbo.reservation 
                        (
                            client_id,
                            room_code,
                            description,
                            start_datetime,
                            end_datetime
                        )
                VALUES
                    (
                        @_client_id,
                        @_room_code,
                        @_description,
                        @_start_datetime,
                        @_end_datetime
                    );
            """;

            mycommand = new SqlCommand(sqlstatement, myconnection);
            mycommand.ExecuteNonQuery();
            myconnection.Close();
            return "OK";
        } catch (Exception ex) {
            return ex.Message;
        }
    }
    [HttpPut]
    [Route("API/WEBAPI/InsertController/InsertBook")]
    public string InsertBook(Book book) {
        return "";
    }
    [HttpPut]
    [Route("API/WEBAPI/InsertController/InsertClient")]
    public string InsertClient(Client client) {
        try {
            myconnection = new SqlConnection(new GetConnection().PlsConnect());
            myconnection.Open();

            string sqlstatement = """
                INSERT INTO 
                    dbo.client 
                        (
                            name,
                            address,
                            dateofbirth
                        )
                VALUES
                    (
                        @_name,
                        @_address,
                        @_dateofbirth
                    );
            """;

            mycommand = new SqlCommand(sqlstatement, myconnection);
            mycommand.Parameters.Add("@_client_id", SqlDbType.VarChar).Value = client.name;
            mycommand.Parameters.Add("@_address", SqlDbType.VarChar).Value = client.address;
            mycommand.Parameters.Add("@_dateofbirth", SqlDbType.DateTime).Value = client.dateofbirth;

            mycommand.ExecuteNonQuery();

            myconnection.Close();
            
            return "OK";
        } catch (Exception ex) {
            return ex.Message;
        }
    }
    [HttpPut]
    [Route("API/WEBAPI/InsertController/InsertCheckout")]
    public string InsertCheckout(Checkout checkout) {
        return "";
    }
    [HttpPut]
    [Route("API/WEBAPI/InsertController/InsertRate")]
    public string InsertRate(Rate rate) {
        return "";
    }
}