
using System.Data;
using System.Data.SqlTypes;
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
        Console.WriteLine($"client: {client}");
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
            mycommand.Parameters.Add("@_name", SqlDbType.VarChar).Value = client.name;
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
    [Route("API/WEBAPI/InsertController/InsertWalkInBook")]
    public string InsertWalkInBook(WalkInBook walkInBook) {
        Console.WriteLine($"InsertWalkInBook: {walkInBook}");
        try {
            myconnection = new SqlConnection(new GetConnection().PlsConnect());
            myconnection.Open();

            string sqlstatement = """
                EXEC InsertBookAndCheckout
                    @client_id = @_client_id
                    @paid_rate_id = @_paid_rate_id
                    @check_in_datetime = @_check_in_datetime
                    @desired_check_out_datetime = @_desired_check_out_datetime
                    @payment_method = @_payment_method
                    @paid_amount = @_paid_amount
            """;
            
            using (SqlCommand mycommand = new SqlCommand(sqlstatement, myconnection)) {
                mycommand.Parameters.AddWithValue("@_client_id", walkInBook.client_id);
                mycommand.Parameters.AddWithValue("@_paid_rate_id", walkInBook.paid_rate_id);
                mycommand.Parameters.AddWithValue("@_check_in_datetime", walkInBook.check_in_datetime);
                mycommand.Parameters.AddWithValue("@_desired_check_out_datetime", walkInBook.desired_check_out_datetime);
                mycommand.Parameters.AddWithValue("@_payment_method", walkInBook.payment_method);
                mycommand.Parameters.AddWithValue("@_paid_amount", walkInBook.paid_amout);

                int rowsAffected = mycommand.ExecuteNonQuery();
                return rowsAffected > 0 ? "Delete successful" : "Deletion failed";
            }
        } catch (Exception e) {
            return e.ToString();
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