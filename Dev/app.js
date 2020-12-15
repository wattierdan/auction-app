// application called "Great-Bay" which allows users to create and bid on assorted items.

// the user is prompted on whether they would like to "POST AN ITEM" or "BID ON AN ITEM"

// If the user selects "POST AN ITEM" they are prompted for an assortment of information regarding the item and then that information is added to the database so that others can bid on it

// If the user selects "BID ON AN ITEM" they are shown a list of all available items and then are prompted to select what they would like to bid on. The console then asks them how much they would like to bid, and their bid is compared to the previous highest bid. If their bid is higher, inform the user of their success and replace the previous bid with the new one. If their bid is lower (or equal), inform the user of their failure and boot them back to the selection screen.

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "itemsDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  createProduct();
});

function listItem() {
  console.log("listing a new item...\n");
  var query = connection.query(
    "INSERT INTO items SET ?",
    {
      
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " item added!\n");
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}



function printItems() {
  console.log("here is a list of all the items you can bid on...\n");
  connection.query("SELECT * FROM items", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

printItems()