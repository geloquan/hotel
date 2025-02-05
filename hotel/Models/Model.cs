using System.Data.SqlTypes;
using System.Security.Cryptography;

namespace Model {
    public class Book {
        public int? id { get; set; }
        public int reservation_id { get; set; }
        public int client_id { get; set; }
        public SqlDateTime start_datetime { get; set; }
        public SqlDateTime end_datetime { get; set; }
    }
    public class Checkout {
        public int? id { get; set; }
        public required string method { get; set; }
        public int book_id { get; set; }
        public int rate_id { get; set; }
        public int client_id { get; set; }
    }
    public class Client {
        public int? id { get; set; }
        public required string name { get; set; }
        public required string address { get; set; }
        public required string dateofbirth { get; set; }
    }
    public class Reservation {
        public int? id { get; set; }
        public int client_id { get; set; }
        public required string room_code { get; set; }
        public required string description { get; set; }
        public SqlDateTime start_datetime { get; set; }
        public SqlDateTime end_datetime { get; set; }
    }
    public class Rate {
        public int? id { get; set; }
        public SqlMoney minimum { get; set; }
        public SqlMoney maximum { get; set; }
        public SqlMoney price { get; set; }
    }
}