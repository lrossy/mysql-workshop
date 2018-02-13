"use strict";

let pkg 	= require("../package.json");

module.exports = {
	app: {
	},

	db: {
    options: {
      user:  process.env.MYSQL_USER,
      database: process.env.MYSQL_DB,
      password: process.env.MYSQL_PWD,
      host: process.env.MYSQL_HOST,
      connectionLimit: 5,
      timezone: 'utc'
    }
	}
};