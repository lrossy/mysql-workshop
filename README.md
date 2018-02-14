# MySQL Workshop 1 - Databases & Data Types

## Workshop Contents


### Common MySQL Data Types

* [INT](https://dev.mysql.com/doc/refman/5.7/en/integer-types.html)
* [BOOLEAN](https://dev.mysql.com/doc/refman/5.7/en/numeric-type-overview.html) aka TINYINT(1)
* [VARCHAR](https://dev.mysql.com/doc/refman/5.7/en/char.html)
* [DATETIME](https://dev.mysql.com/doc/refman/5.7/en/datetime.html)
* [ENUM](https://dev.mysql.com/doc/refman/5.7/en/enum.html)


### Connecting to MySQL

```
# Start MySQL Instance
$ systemctl start mysql.service

# Connect to the MySQL Instance
$ mysql -u<USERNAME> -p
#Remember, -p just means it will prompt you for a password, dont enter it with the mysql command!
```

### Database Statements

* [Show Databases](https://dev.mysql.com/doc/refman/5.7/en/show-databases.html)
* [Select Database](https://dev.mysql.com/doc/refman/5.7/en/use.html)
* [Show Tables](https://dev.mysql.com/doc/refman/5.7/en/show-tables.html)
* [Create Database](http://dev.mysql.com/doc/refman/5.7/en/create-database.html)
* [Drop Database](http://dev.mysql.com/doc/refman/5.7/en/drop-database.html)

### Table Statements

* [Create Table](http://dev.mysql.com/doc/refman/5.7/en/create-table.html)
* [Alter Table](http://dev.mysql.com/doc/refman/5.7/en/alter-table.html)
* [Truncate Table](http://dev.mysql.com/doc/refman/5.7/en/truncate-table.html)
* [Drop Table](http://dev.mysql.com/doc/refman/5.7/en/drop-table.html)
* [Describe Table](https://dev.mysql.com/doc/refman/5.7/en/show-columns.html)

### Files to understand:

* All queries we used in the lecture with comments: [/db/queries.sql](https://github.com/lrossy/mysql-workshop/blob/master/db/queries.sql)
* First, look at simple.js and understand it
* Then, express-simple.js
* Finally, complete example/server.js

### Instructions for complete example coming soon
