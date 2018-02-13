var mysql = require('promise-mysql');


var conn = mysql.createConnection({
  host: '159.65.32.209',
  user: 'luke',
  password: '123456',
  database: 'decode'
}).then(function(conn){
  var result = conn.query('select * from expenses');
  return result;
}).then(function(rows){
  // Logs out a list of hobbits
  console.log(rows);
});