using System.Data.SqlTypes;
using System.Security.Cryptography;

namespace Model {
    public class Book {
        public int? id;
        public int reservation_id;
        public int client_id;
        public SqlDateTime start_datetime;
        public SqlDateTime end_datetime;
    }
    public class Checkout {
        public int? id;
        public required string method;
        public int book_id;
        public int rate_id;
        public int client_id;
    }
    public class Client {
        public int? id;
        public required string name;
        public required string address;
        public SqlDateTime dateofbirth;
    }
    public class Reservation {
        public int? id;
        public int client_id;
        public required string room_code;
        public required string description;
        public SqlDateTime start_datetime;
        public SqlDateTime end_datetime;
    }
    public class Rate {
        public int? id;
        public SqlMoney minimum;
        public SqlMoney maximum;
        public SqlMoney price;
    }
}