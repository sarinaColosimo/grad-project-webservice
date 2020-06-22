const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'grad_project'
});

connection.connect();

process.on('SIGINT', () => { connection.end(); });

module.exports = connection;
