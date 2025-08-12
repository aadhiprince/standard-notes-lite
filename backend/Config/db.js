const mysql = require('mysql2')

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "PremaPleasant",
  database: "mern_login",
});

db.connect(() => {
  console.log("MySQL Connected");
});

module.exports = db