const db = require("../db/connection");
const cTable = require("console.table")
const { addDepartmentQuestion, addRoleQuestion, addEmployeeQuestion, mainMenuQuestion, updateEmployeeQuestion} = require("./userPrompts");
const inquirer = require("inquirer");

// Function to route input selected by user at main menu
const routeRequest = (data) => {
    switch(data.optionSelect) {
        case "View all departments":
            viewAllDepartments();
            break;

        case "View all roles":
            viewAllRoles();
            break;

        case "View all employees":
            viewAllEmployees();
            break;

        case "Add a department":
            addDepartment();
            break;

        case "Add a role":
            addRole();
            break;

        case "Add an employee":
            addEmployee();
            break;

        case "Update an employee":
            updateEmployee();
            break;
        
        default:
            exitApp();
            break;
    };
};

// Function to show all departments info stored in db
const viewAllDepartments = () => {
    // SQL command to be sent to db
    const sql = `SELECT * FROM department`;
    // Send query to db
    db.query(sql, (err, row) => {
        if (err) {
            console.log(err);
        }
        else {
            // Print table data to console
            const table = cTable.getTable(row);
            console.log(table);
            returnToMainMenu();
        }
    })
};

// Function to get roles data from db
const viewAllRoles = () => {
    const sql = `SELECT role.id, role.title, role.salary, department.name
                AS department
                FROM role 
                LEFT JOIN department
                ON role.department_id = department.id`;
    db.query(sql, (err, row) => {
        if (err) {
            console.log(err);
        }
        else {
            const table = cTable.getTable(row);
            console.log(table);
            returnToMainMenu();
        }
    })
};

// Function to get all employee data from db
const viewAllEmployees = () => {
    const sql = `
        SELECT e.id id, e.first_name first_name, e.last_name last_name,
        CONCAT(m.first_name, ' ', m.last_name) manager, role.title AS role, department.name AS department, role.salary AS salary
        FROM employee e
        LEFT JOIN role ON e.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON m.id = e.manager_id

    `;
    db.query(sql, (err, row) => {
        if (err) {
            console.log(err);
        }
        else {
            const table = cTable.getTable(row);
            console.log(table);
            returnToMainMenu();
        }
    });
};

// Function to add new department to db
const addDepartment = (data) => {
    const sql = `INSERT INTO  department (name) VALUES (?)`;
    // Prompt user for information about new department then pass data to db.query to interract with db
    inquirer.prompt(addDepartmentQuestion).then((data) => {
            db.query(sql, data.departmentName, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Department successfully added!");
                    returnToMainMenu();
                };
            })
        }
    );
};

// Function to add new role to db
const addRole = () => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
    inquirer.prompt(addRoleQuestion).then(
        (data) => {
            const params = [data.roleName, data.roleSalary, data.roleDepartment]
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("New role successfully added!");
                    returnToMainMenu();
                };
            })
        }
    )
};

// Function to add new employee to db
const addEmployee = () => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
    inquirer.prompt(addEmployeeQuestion).then(
        (data) => {
            // Manager id will either be the id of another employee or null indicating they have no manager
            const params = [data.firstName, data.lastName, data.roleId, data.managerId === "NULL" ? null : data.managerId];
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("New employee successfully added!");
                    returnToMainMenu();
                }
            })
        }
    )
};

// Function to update employee role
const updateEmployee = () => {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
    inquirer.prompt(updateEmployeeQuestion).then((data) => {
        const params = [data.newRole, data.employeeId];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Employee role successfully updated!");
                returnToMainMenu();
            }
        })
    })
};

// Function to return user to main menu after executing other actions
const returnToMainMenu = () => {
    inquirer.prompt(mainMenuQuestion).then(routeRequest);
};

// Function that allows user to exit the app from main menu
const exitApp = () => {
    console.log("Goodbye!")
    process.exit(0);
}

module.exports = {routeRequest};