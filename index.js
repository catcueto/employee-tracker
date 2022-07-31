// Importing and requiring mysql2
const mysql = require("mysql2");
// Importing and requiring inquirer
const inquirer = require("inquirer");
// Prints pretty tables (array of objects) in console
const consoleT = require("console.table");
const util = require("util");

// Connecting to database & importing mysql library
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root1234",
    database: "staff_db",
  },
  console.log(`Successfully connected to the staff_db database.`)
);

db.query = util.promisify(db.query);

//Connecting to the database; calls mainMenu function
db.connect(function (err) {
  if (err) throw err;
  mainMenu();
});

// TODO: Display MAIN MENU so user can see initial choices
const mainMenu = async () => {
  try {
    let response = await inquirer.prompt({
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add New Department",
        "Add New Role",
        "Add New Employee",
        "Update Employee Role",
      ],
    });

    switch (response.choice) {
      case "View All Departments":
        viewAllDept();
        break;

      case "View All Roles":
        viewAllRole();
        break;

      case "View All Employees":
        viewAllEmpl();
        break;

      case "Add New Department":
        addNewDept();
        break;

      case "Add New Role":
        addNewRole();
        break;

      case "Add New Employee":
        viewAddEmpl();
        break;

      case "Update Employee Role":
        updateRole();
        break;
    }
  } catch (err) {
    console.log(err);
    mainMenu();
  }
};

// TODO: VIEW ALL DEPARTMENTS
const viewAllDept = async () => {
  try {
    console.log("\n------------ All Departments ------------\n");
    let prompt = "SELECT * FROM department";
    db.query(prompt, function (err, res) {
      if (err) throw err;
      let deptArray = [];
      // iterate thru dept array
      res.forEach((dept) => {
        deptArray.push(dept);
      });
      console.table(deptArray);
      mainMenu();
    });
  } catch (err) {
    // find error, console.log it and return to main menu
    console.log(err);
    mainMenu();
  }
};

// TODO: VIEW ALL ROLES
const viewAllRole = async () => {
  try {
    console.log("\n------------ All Roles ------------\n");
    prompt = "SELECT * FROM roles";
    db.query(prompt, function (err, res) {
      if (err) throw err;
      let roleArray = [];
      // iterate thru role array
      res.forEach((role) => {
        roleArray.push(role);
      });
      console.table(roleArray);
      mainMenu();
    });
  } catch (err) {
    console.log(err);
    mainMenu();
  }
};

// TODO: VIEW ALL EMPLOYEES
const viewAllEmpl = async () => {
  try {
    console.log("\n------------ All Employees ------------\n");
    prompt = "SELECT * FROM employee";
    db.query(prompt, function (err, res) {
      if (err) throw err;
      let emplArray = [];
      // iterate thru employee array
      res.forEach((empl) => {
        emplArray.push(empl);
      });
      console.table(emplArray);
      mainMenu();
    });
  } catch (err) {
    console.log(err);
    mainMenu();
  }
};

//TODO: ADDING NEW DEPARTMENT + PROMPT
const addNewDept = async () => {
  try {
    console.log("\n------------ All Department ------------\n");
    let answer = await inquirer.prompt({
      type: "input",
      name: "addDept",
      message: "What is the name of the department?",
      default: "New Department",
    });
    await db.query("INSERT INTO department SET ?", {
      names: answer.addDept,
    });

    console.log(`\n${answer.addDept} added to department list\n`);
    mainMenu();
  } catch (err) {
    console.log(err);
    mainMenu();
  }
};

// TODO: ADDING NEW ROLE
const addNewRole = async () => {
  try {
    console.log("\n------------ Add Role ------------\n");
    let roleName = await inquirer.prompt({
      type: "input",
      name: "roleNameNew",
      message: "What is the name of the role?",
    });
    // SALARY PER ROLE
    let roleSalary = await inquirer.prompt({
      type: "input",
      name: "roleSalaryNew",
      message: "What is the salary of the role?",
    });

    // Overall department list
    let departments = await db.query("SELECT * FROM department");

    let roleDept = await inquirer.prompt({
      type: "list",
      name: "newRoleDept",
      message: "Which department does the role belong to?",
      choices: departments.map((newRoleDept) => {
        return {
          name: newRoleDept.names,
          value: newRoleDept.id,
        };
      }),
    });

    await db.query("INSERT INTO roles SET ?", {
      title: roleName.roleNameNew,
      salary: roleSalary.roleSalaryNew,
      department_id: roleDept.newRoleDept,
    });

    console.log(`\n${roleName.newRoleName} added to Roles\n`);
    mainMenu();
  } catch (err) {
    console.log(err);
    mainMenu();
  }
};
