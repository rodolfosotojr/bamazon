-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "products" within bamazon_db --
CREATE TABLE products (
  -- Makes a unique identifier for each product--
  id INTEGER(10) AUTO_INCREMENT NOT NULL
  -- Makes a string column called "product_name" which cannot contain null --
  product_name VARCHAR(30) NOT NULL,
  -- Makes a string column called "department_name" which cannot contain null --
  department_name VARCHAR(30) NOT NULL
  -- Makes a numeric column called "price" --
  price INTEGER (10),
  -- Makes an numeric column called "stock_quantity" --
  stock_quantity INTEGER(10)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spark Plugs", "Engine", 7, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Struts", "Suspension", 115, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shock Absorbers", "Suspension", 26, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Goodyear Windshield Wipers Set", "Maintenance", 35, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bosch Windshield Wipers Set", "Maintenance", 42, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Armor All Wipes", "Maintenance", 4, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Headlights", "Functionality", 59, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jumper Cables", "Functionality", 26, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Batteries", "Engine", 125, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Key Fobs", "Functionality", 15, 150);