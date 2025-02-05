public class GetConnection {
    public string PlsConnect() {
        //return """Data Source = Marcos; Database = hotel; Integrated Security = SSPI; TrustServerCertificate = True;""";
        return @"Data Source = (localdb)\MSSQLLocalDB; Database = hotel; Integrated Security = SSPI; TrustServerCertificate = True;";
    }
}