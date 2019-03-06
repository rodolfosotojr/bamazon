//node_modules packages required for the app to work
var mysql = require("mysql");
var inquirer = require("inquirer");
//global variables
var price;
var userAnswer;
var stock;

//create a variable connection to the mysql connection method to refer down below
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

//connect to server and throw error. upon connecting, run the showProducts function 
connection.connect(function (err, ) {
    if (err) throw err;

    console.log("Connected as id: " + connection.threadId + "\n");
    showProducts();
});

//function that displays the table from my database and runs the start function
function showProducts() {
    connection.query(
        "SELECT * FROM bamazon_db.products;", function (err, res) {
            console.table(res);
            start();
        }
    )
};

//function that queries my table and includes a call back function after the data is retreived from the user
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
                //assign the value to userAnswer for my global variable to be called on later
                userAnswer = answer.itemID;
                connection.query(
                    "SELECT  * FROM products WHERE id = ?",
                    [
                        //the userAnswer was delcared and given a value within this function
                        userAnswer
                    ],
                    function (err, res) {
                        if (err) throw err;
                        //if my response returns and empty array, I would alert the user of the invalid response
                        if (res.length < 1) {
                            console.log("\nYou have selected an invalid response. Please try again.\n");
                            start();
                        } else {
                            //assign values to my global variables to then call on them at a later time
                            price = res[0].price;
                            stock = res[0].stock_quantity;
                            console.log("\nYou have selected the following item: \n");
                            console.table(res);
                            //run the update function once the selections have been made
                            update();
                        }
                    }
                )
            });
    });
};

//update function that updates the table from my server
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

//funciton that will ask the user if they would like to purchase another item or end their transactions
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

