const db = require("../db/connection");
const cTable = require("console.table")

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
        m.first_name manager, role.title AS role, department.name AS department, role.salary AS salary
        FROM employee e
        LEFT JOIN role ON e.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON m.manager_id = e.id

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

module.exports = {routeRequest};