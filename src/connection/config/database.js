var mysql = require('mysql');

var connection = mysql.createConnection({
  // host: "192.168.0.125",
  // host: "localhost",
  port: '3306',
  user: 'root',
  password: '',
  database: 'database name',
});

connection.connect(function (error) {
  if (!error) {
    console.log('connected');
    const data = 'select * from 	users';
    connection.query(data, function (error, result) {
      console.log(result);
    });
  } else {
    console.log(error, 'Error connecting to MySQL');
  }
});

module.exports = connection;
