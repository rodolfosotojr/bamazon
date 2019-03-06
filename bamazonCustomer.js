var mysql = require("mysql");
var inquirer = require("inquirer");
var price;
var userAnswer;
var stock;

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
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
    connection.query("SELECT * FROM products", function (err, ) {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "input",
                message: "\nWhat is the ID of the product you would like to buy?",
                name: "itemID"
            },
        ])
            .then(function (answer) {
                userAnswer = answer.itemID;
                connection.query(
                    "SELECT  * FROM products WHERE id = ?",
                    [
                        userAnswer
                    ],
                    function (err, res) {
                        if (err) throw err;
                        
                        if (res.length < 1) {
                            console.log("\nYou have selected an invalid response. Please try again.\n");
                            start();
                        } else {
                            price = res[0].price;
                            stock = res[0].stock_quantity;
                            console.log("\nYou have selected the following item: \n");
                            console.table(res);
                            update();
                        }
                    }
                )
            });
    });
};

function update() {
    inquirer.prompt([
        {
            type: "input",
            message: "\nHow many of this product would you like to buy?",
            name: "quantity"
        },
    ])
        .then(function (answer) {

            if (answer.quantity <= 0) {
                console.log("\nNot a valid entry.");
                showProducts();

            } else if (answer.quantity <= stock) {
                connection.query(
                    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?",
                    [
                        answer.quantity, userAnswer
                    ],
                    function (err, ) {
                        if (err) throw err;
                        // console.log(stock)
                        console.log("Item purchased successfully!\n");
                        console.log("Your total is $" + answer.quantity * price + "\n");
                        askAgain();
                    }
                )
            } else if (answer.quantity > stock && stock === 0) {
                console.log("\n Sorry but we are all out of this item. Come back another day.\n");
                askAgain();
            } else if (answer.quantity > stock) {
                console.log("\nInsufficient quantity. Please review order and try again.");
                showProducts();
            }

        });
};

function askAgain() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to purchase another item?",
            choices: ["Yes", "No"],
            name: "newPurchase"
        },
    ])
        .then(function (answer) {
            if (answer.newPurchase === "Yes") {
                showProducts();
            } else {
                console.log("\nThank you for stopping by! Have a great day!");
                connection.end();
            }

        });
};

