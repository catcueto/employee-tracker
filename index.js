// Prints pretty tables (array of objects) in console
const cTable = require("console.table");
// Importing and requiring mysql2
const mysql = require("mysql2");
// Importing and requiring inquirer
const inquirer = require("inquirer");
const util = require("util");
const { debug } = require("console");

// Connecting to database & importing mysql library
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root1234",
    database: "staff_db",
  },
  console.log(`Successfully connected to the staff_db database. \n\n  --------------------------
  EMPLOYEE MANAGEMENT SYSTEM
  -------------------------- \n`)
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
        "Update Employee Info",
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
        addNewEmpl();
        break;

      case "Update Employee Info":
        updateEmpl();
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
    employeeName = "SELECT * FROM employee";
    db.query(employeeName, function (err, res) {
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
    let department = await inquirer.prompt({
      type: "input",
      name: "addDept",
      message: "What is the name of the department?",
      default: "New Department",
    });
    console.log(department);
    await db.query("INSERT INTO department SET ?", {
      names: department.addDept,
    });

    console.log(`\n${department.addDept} added to department list\n`);
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
      default: "90000",
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

    console.log(`\n${roleName.roleNameNew} added to Roles\n`);
    mainMenu();
  } catch (err) {
    console.log(err);
    mainMenu();
  }
};

//TODO: Add new employee
const addNewEmpl = async () => {
  try {
    console.log("\n------------ Add Employee ------------\n");
    // first name
    let empFirstName = await inquirer.prompt({
      type: "input",
      name: "empFNameNeW",
      message: "What is the employee's first name?",
    });

    // last name
    let empLastName = await inquirer.prompt({
      type: "input",
      name: "empLNameNew",
      message: "What is the employee's last name?",
    });

    // Employee's role
    let roles = await db.query("SELECT * FROM employee");
    let roleEmpl = await inquirer.prompt({
      type: "list",
      name: "newEmpRole",
      message: "What role does your employee have?",
      choices: roles.map((newEmpRole) => {
        return {
          name: newEmpRole.role_id,
          value: newEmpRole.id,
        };
      }),
    });

    await db.query("INSERT INTO employee SET ?", {
      first_name: empFirstName.empFNameNeW,
      last_name: empLastName.empLNameNew,
      role_id: roleEmpl.newEmpRole,
    });

    console.log(
      `\n${empFirstName.empFNameNeW} ${empLastName.empLNameNew} added to Employees List\n`
    );
    mainMenu();
  } catch (err) {
    console.log(err);
    mainMenu();
  }
};

// TODO: Update employee
function updateEmpl() {
  db.query(
    "SELECT id, first_name, last_name FROM employee",
    function (err, res) {
      if (err) {
        throw err;
      }
      let employeeList = res.map((employeeInfo) => {
        return {
          name: employeeInfo.first_name,
          value: employeeInfo.id,
        };
      });
      console.log(employeeList);

      db.query("SELECT id, title FROM roles", function (err, role) {
        if (err) {
          throw err;
        }
        let roleList = role.map((roleInfo) => {
          return {
            name: roleInfo.title,
            value: roleInfo.id,
          };
        });

        inquirer
          .prompt([
            {
              type: "list",
              name: "who",
              message: "which employee would you like to update?",
              choices: employeeList,
            },
            {
              type: "list",
              name: "role",
              message: "What role would you like to give this employee?",
              choices: roleList,
            },
          ])
          .then((answers) => {
            console.log(answers);
            db.query(
              `UPDATE employee SET role_id = ${answers.role} WHERE id = ${answers.who}`,
              function (err, results) {
                if (err) {
                  throw err;
                }
                console.table("Successfully updated");
                mainMenu();
              }
            );
          });
      });
    }
  );
}
