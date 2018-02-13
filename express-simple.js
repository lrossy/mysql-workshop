/**
 * Created by lrossy on 2018-02-12.
 */
var mysql = require('promise-mysql');
var express = require('express');
var app = express();


var conn = mysql.createPool({
  host: '159.65.32.209',
  user: 'luke',
  password: '123456',
  database: 'decode'
});

app.get('/', function (req, res) {
  conn.query('select * from expenses')
    .then( result => {
      console.log('result', result);
      //force a json response
      res.json(result)
    })

});

app.listen(3000);