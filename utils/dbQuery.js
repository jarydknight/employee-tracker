const db = require("../db/connection");
const cTable = require("console.table")
const { addDepartmentQuestion, addRoleQuestion, addEmployeeQuestion, mainMenuQuestion, updateEmployeeQuestion} = require("./userPrompts");
const inquirer = require("inquirer");

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

const viewAllDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, row) => {
        if (err) {
            console.log(err);
        }
        else {
            const table = cTable.getTable(row);
            console.log(table, "\n");
            returnToMainMenu();
        }
    })
};

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

const addDepartment = (data) => {
    const sql = `INSERT INTO  department (name) VALUES (?)`;
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

const addEmployee = () => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
    inquirer.prompt(addEmployeeQuestion).then(
        (data) => {
            const params = [data.firstName, data.lastName, data.roleId, data.managerId];
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

const returnToMainMenu = () => {
    inquirer.prompt(mainMenuQuestion).then(routeRequest);
};

const exitApp = () => {
    console.log("Goodbye!")
    process.exit(0);
}

module.exports = {routeRequest};