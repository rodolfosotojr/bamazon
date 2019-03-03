var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Monica12!",
    database: "bamazon_db"
});

connection.connect(function (err, ) {
    if (err) throw err;

    console.log("Connected as id: " + connection.threadId + "\n");
    showProducts();
});

function showProducts() {
    connection.query(
        "SELECT * FROM bamazon_db.products;", function (err, res) {
            console.table(res);
            start();
        }
    )
};

function start() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the product you would like to buy?",
            name: "itemID"
        },
        {
            type: "input",
            message: "How many of this product would you like to buy?",
            name: "quantity"
        }
    ])
        .then(function (answer) {
            for(var i = 0; i < answer.itemID; i++){
                if(answer.itemID === 1)
                console.log("Fag")
            }
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {stock_quantity: answer.quantity
                    },
                    {}
                ],
                function(err) {
                    if(err) throw err;
                    console.log("Item purchased successfully!")
                    showProducts();
                    start();
                } 
            )
        })
}

