// able to promisify async function
const util = require("util");
const mysql = require("mysql2");
const { prompt } = require("inquirer");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "business_db",
});

// promisify db.query and bind *this to fix scope of reference
const query = util.promisify(db.query).bind(db);
// now able to just run query().then

// Promisified
const queryManager = {
  view(tableName) {
    return query(`SELECT * FROM ${tableName}`);
  },
  async add(tableName) {
    const name = await prompt({
      message: `What ${tableName.slice(0, -1)} would you like to add?`,
      name: "name",
    });
  },
};

module.exports = queryManager;
