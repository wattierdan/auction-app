// application called "Great-Bay" which allows users to create and bid on assorted items.

// the user is prompted on whether they would like to "POST AN ITEM" or "BID ON AN ITEM"

// If the user selects "POST AN ITEM" they are prompted for an assortment of information regarding the item and then that information is added to the database so that others can bid on it

// If the user selects "BID ON AN ITEM" they are shown a list of all available items and then are prompted to select what they would like to bid on. The console then asks them how much they would like to bid, and their bid is compared to the previous highest bid. If their bid is higher, inform the user of their success and replace the previous bid with the new one. If their bid is lower (or equal), inform the user of their failure and boot them back to the selection screen.

// Import the mysql package
const mysql = require('mysql');

// Import inquirer package 
const inquirer = require('inquirer');

const Item = require("./lib/Item");


const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Edwink1225',
  database: 'itemsdb',
});

const items = []

connection.connect((err) => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  welcome()
});


function welcome() {
  inquirer
      .prompt([
          {
              type: "list",
              name: "task",
              message: "What would you like to do?",
              choices: [
                  "POST AN ITEM",
                  "BID ON AN ITEM"  
              ]
          }
      ]).then(userChoice => {
          switch (userChoice.task) {

              case "POST AN ITEM":
                  itemPost()
                  break

              case "BID ON AN ITEM":
                  itemBid()
                  break

          }
      })
}

function itemPost() {
  inquirer
      .prompt([
          {
              type: "input",
              message: "what is the Item?",
              name: "itemTitle"
          },
          {
              type: "input",
              message: "describe the item",
              name: "itemDescript"
          },
          {
              type: "input",
              message: "what would you like to start the bid at?",
              name: "itemCost"
          }
      ]).then(userChoice => {
          const item = new Item(userChoice.itemTitle, userChoice.itemDescript, userChoice.itemCost)
          items.push(item)
          addItem()
      }),
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " item inserted!\n");
    }
}

function addItem() {
  console.log("adding your item to the bay...\n");
  var query = connection.query(
    "INSERT INTO items SET ?",
    items,
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " item inserted!\n");
    }
  );
}

// function readItems() {
//     console.log("getting all items that are for sale...\n");
//     connection.query("SELECT * FROM items", function(err, res) {
//       if (err) throw err;
//       console.log(res);
//       connection.end();
//     });
// }