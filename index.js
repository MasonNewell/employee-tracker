const { prompt } = require("inquirer");
const mysql = require("mysql2");
const db = require("./queries"); // queryManager

// Ask user what they want to do, async=await
const main = async () => {
  const response = await prompt({
    message: "Welcome to employee-tracker, what do you want to do?",
    type: "list",
    name: "choice",
    choices: [
      { name: "View All Departments", value: "view department" },
      { name: "View All Roles", value: "view role" },
      { name: "View All Employees", value: "view employee" },
      { name: "Add A Department", value: "add department" },
      { name: "Add A Role", value: "add role" },
      { name: "Add A Employee", value: "add employee" },
    ],
  });
  const [method, argument] = response.choice.split(" "); // ["view", "department/role/employee"]
  const result = await db[method](argument); // db.view, db.update
  console.table(result);
  setTimeout(main, 2000); // 2 seconds after user makes choice
};

// Start App
main();
