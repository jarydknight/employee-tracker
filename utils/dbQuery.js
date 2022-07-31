const db = require("../db/connection");
const cTable = require("console.table")
const { addDepartmentQuestion, addRoleQuestion } = require("./userPrompts");
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
            console.log(table);
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
        }
    });
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
                    console.log("New role successfully added!")
                };
            })
        }
    )
};

module.exports = {routeRequest};