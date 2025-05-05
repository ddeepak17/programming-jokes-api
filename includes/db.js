const mysql = require("mysql");
const { db_params } = require ("./config");

const connection = mysql.createConnection({
  host: db_params.host,
  user: db_params.user,
  password: db_params.password,
  database: db_params.database,
  port: db_params.port
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err.message);
   return; 
  }
  console.log("Connected to MySQL database");
});

connection.query("SELECT * FROM jokes", (err, results) => {
  if (err) {
      console.error("Error Running Test Query:", err.code, "-", err.sqlMessage);
      return;
  }
  console.log("Database Query Was Successful! Retrieved Jokes:");
  console.table(results);
});

module.exports = connection;