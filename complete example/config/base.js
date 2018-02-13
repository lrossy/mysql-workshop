"use strict";

let path = require("path");
let pkg = require("../../package.json");

module.exports = {
  app: {
    title: pkg.title,
    version: pkg.version,
    description: pkg.description,
    url: "http://localhost:" + (process.env.PORT || 3000) + "/",
    //googleAnalyticsID: 'UA-xxxxx-x',
    contactEmail: "lrossy@gmail.com"
  },

  ip: process.env.NODE_IP || "0.0.0.0",
  port: process.env.PORT || 3001,

  rootPath: global.rootPath,

  test: false,
  db: {
    options: {
      user:  process.env.MYSQL_USER || 'luke',
      database: process.env.MYSQL_DB || 'decode',
      password: process.env.MYSQL_PWD || '123456',
      host: process.env.MYSQL_HOST || '159.65.32.209',
      connectionLimit: 5,
      timezone: 'utc'
    }
  }
};