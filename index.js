const mysql = require("mysql2");
const inquirer = require("inquirer");

// connect to db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "business_db",
});

// Choices options for inquirer prompt
const allRoles = [];
function getRoles() {
  db.query("SELECT * FROM role", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      allRoles.push(res[i].title);
    }
  });
  return allRoles;
}

const allManagers = [];
function getManager() {
  db.query("SELECT first_name, last_name FROM employee", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      allManagers.push(res[i].first_name);
    }
  });
  return allManagers;
}

// Beginning Prompt
function main() {
  inquirer
    .prompt({
      message: "Welcome to employee-tracker, what do you want to do?",
      type: "list",
      name: "choice",
      choices: [
        { name: "View all departments", value: "view department" },
        { name: "View all roles", value: "view role" },
        { name: "View all employees", value: "view employee" },
        { name: "Add a department", value: "add department" },
        { name: "Add a role", value: "add role" },
        { name: "Add a employee", value: "add employee" },
      ],
    })
    .then((data) => {
      switch (data.choice) {
        //  View All Departments
        case "view department":
          viewDepartments();
          break;
        //  View All Roles
        case "view role":
          viewRoles();
          break;
        //  View All Employees
        case "view employee":
          viewEmployees();
          break;
        //  Add a department
        case "add department":
          addDepartment();
          break;
        //  Add a role
        case "add role":
          addRole();
          break;
        //  Add a employee
        case "add employee":
          addEmployee();
          break;
      }
    });
}
// view departments
function viewDepartments() {
  db.query("SELECT * FROM department", function (err, res) {
    console.table(res);
  });
}
// View roles
function viewRoles() {
  db.query("SELECT * FROM role", function (err, res) {
    console.table(res);
  });
}
// View employees
function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, res) {
    console.table(res);
  });
}
//  Add a department
function addDepartment() {
  inquirer
    .prompt({
      name: "name",
      message: "Name of department to add: ",
    })
    .then((data) => {
      db.query("INSERT INTO department SET ? ", { name: data.name });
    });
}
// Add Role
function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        message: "Enter the title for the role: ",
      },
      {
        name: "salary",
        message: "Enter the salary: ",
      },
    ])
    .then((data) => {
      db.query("INSERT INTO role SET ? ", { title: data.title, salary: data.salary });
    });
}

// Add Employee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        message: "Enter first name: ",
      },
      {
        name: "lastName",
        message: "Enter last name: ",
      },
      {
        name: "title",
        type: "list",
        message: "Employee title: ",
        choices: getRoles(),
      },
      {
        name: "manager",
        type: "list",
        message: "Select manager for this employee: ",
        choices: getManager(),
      },
    ])
    .then((data) => {
      console.table(data);
    });
}

// Start Program
main();
