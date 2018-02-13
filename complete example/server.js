/**
 * Created by lrossy on 2018-02-12.
 * this is not suitable for production, and was created in roughly 45 minutes. Use as a guide if you are stuck.
 */

const express = require('express');
const cors = require('cors');
const mysql = require('promise-mysql');
const helmet = require('helmet');

//my files
let config		= require("./config");

// Express middleware
const bodyParser = require('body-parser');
const morgan = require('morgan');
const checkLoginToken = require('./lib/check-login-token.js');
const onlyLoggedIn = require('./lib/only-logged-in');

// Data loader
const DataLoader = require('./lib/dataLoader');

// Database
const connection = mysql.createPool(config.db.options);

const dataLoader = new DataLoader(connection);

//controllers
const authController = require('./controllers/auth.js');

// Express initialization
var app = express();
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json({limit: '25mb'}));
app.use(checkLoginToken(dataLoader));
app.use(cors());

app.get('/', (req, res) =>{
  res.send('hello, this route is not protected in any way')
});
app.get('/protected', onlyLoggedIn,(req, res) =>{
  res.send('hello, this route is protected')
});

app.use('/auth', authController(dataLoader));

app.listen(config.port, () => {
  console.log(`Web server is listening on http://${config.ip}:${config.port}`);
});

module.exports = {
  app
};