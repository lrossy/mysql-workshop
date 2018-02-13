-- Categories of SQL queries

--DDL (Data Definition Language)
--  CREATE DATABASE
--  CREATE TABLE
--  ALTER TABLE
--  DROP TABLE

--DML (Data Manipulation Language)
--  INSERT
--  UPDATE
--  DELETE

--DQL (Data Query Language)
--  SELECT

--DCL (Data Control Language)
--  CREATE USER
--  GRANT



-- queries used in lecture

--create a user, use 'user'@'%' to allow connections remote and locally
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';

-- grant privileges
GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost'
  WITH GRANT OPTION;

--create & select a db
CREATE database expenses
USE expenses;

--create
CREATE TABLE `expenses` (
 `id` int NOT NULL AUTO_INCREMENT  PRIMARY KEY,
 `cost_in_cents` INT,
 `cat`  enum('food', 'rent', 'other'),
 `description` varchar(100) NOT NULL,
 `createdAt` timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--simple insert

INSERT INTO expenses (id, cost_in_cents,  cat, description, createdAt) VALUES (1, 1000, 'other', 'bought a soda', CURRENT_TIMESTAMP);

--Alter a table

ALTER TABLE expenses CHANGE COLUMN createdAt createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP

--Batch insert using default values
INSERT INTO expenses (cost_in_cents,  cat, description) VALUES
  (1000, 'other', 'bought a soda'),
  (2000, 'other', 'bought a toy'),
  (3000, 'food', 'bought a burger');

--selects

SELECT * FROM expenses;
SELECT * from expenses WHERE cat = 'food';
SELECT * from expenses WHERE cost_in_cents < 2000 AND cat = 'other';

--create
CREATE TABLE `users` (
 `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
 `first_name` VARCHAR(50),
 `last_name` VARCHAR(50),
 `age` TINYINT,
 `gender` ENUM('male', 'female'),
 `createdAt` timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- populate the users table
INSERT INTO users (first_name, last_name, age, gender)
  VALUES ('Carey', 'Price', 25, 'male'),
  ('Jane', 'doe', 22, 'female'),
  ('Alex', 'Smith', 55, 'male');

-- Update the expenses table to support have a user 'own' the expense

ALTER TABLE `decode`.`expenses` ADD COLUMN `user_id` INT;

UPDATE expenses SET user_id = 1;
UPDATE expenses SET user_id = 2 WHERE id >= 4;

--implicit Join

SELECT * from expenses, users WHERE users.id = expenses.user_id;

--Explicit Join
SELECT * from expenses JOIN users ON users.id = expenses.user_id;

-- what about if there was a null value in expenses and you needed that to be included?
INSERT INTO expenses (cost_in_cents,  cat, description) VALUES
  (6000, 'other', 'bought a soda2');

-- LEFT JOIN solves this!
SELECT * from expenses LEFT JOIN users ON users.id = expenses.user_id;

-- see this for more info: https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/

--use these for complete example!

CREATE TABLE `sessions` (
  `session_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(100) NOT NULL,
  PRIMARY KEY (`session_id`),
  UNIQUE KEY `token` (`token`),
  KEY `fk_user_session` (`user_id`),
  CONSTRAINT `fk_user_session` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(25) DEFAULT NULL,
  `lastName` varchar(35) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
);