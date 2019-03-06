# bamazon

bamazonCustomer is a simple application using mySQL. The database bamazon_db has a table of products for the customer to order from.

## Installing the app
1. Clone this respostitory onto your local machine.
2. Install the packages provided in the package.json file.
3. Once you have installed all necesarry packages, initiate the bamazonCustomer.js file.

## Using the app
On the command line select a valid ID from the table presented:
1. Once you have selected the ID, put the amount you would like of the specific item. If you input an valid amount, you will get a confirmation and a total price. Once this transaction is complete, you will be asked if you would like to purchase another item. If you say yes, you will be asked for another ID.
![](/images/start_game.png)
2. If you select a valid ID and select an amount greater than the stock quantity, you will be asked yo review your order and try again. If you select an invalid ID, you will be notified of this and prompted to select a valid ID.
![](/images/insufficient_quantity.png)
3. If you try and purchase an item with no stock available, you will be notified and asked if you would like to purchase a different item? If not, your connection will end with a friendly farewell.
![](/images/out_of_stock.png)
