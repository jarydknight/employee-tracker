const db = require("../db/connection");

const mainMenuQuestion = [
    {
        type: "list",
        name: "optionSelect",
        message: "Welcome to the main menu. Please select on option to proceed",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee"]
    }
];

const addDepartmentQuestion = [
    {
        type: "input",
        name: "departmentName",
        message: "Enter a name for the new department"
    }
];

const addRoleQuestion = [
    {
        type: "input",
        name: "roleName",
        message: "Enter the name for the new role"
    },
    {
        type: "input",
        name: "roleSalary",
        message: "Enter the salary for the new role"
    },
    {
        type: "list",
        name: "roleDepartment",
        message: "Choose a department for the new role",
        choices: function () {
            return new Promise (function (resolve, reject) {
                const sql = `SELECT * FROM department`;
                db.query(sql, (err, row) => {
                    if (err) {
                        return reject(err);
                    }
                    else {
                        let optionsArr = [];
                        row.forEach(obj => optionsArr.push({name: obj.name, value: obj.id}))
                        resolve(optionsArr)
                    }
                })
            })
        }
    }
];

const addEmployeeQuestion = [
    {
        type: "input",
        name: "firstName",
        message: "Enter the first name for your new employee"
    },
    {
        type: "input",
        name: "lastName",
        message: "Enter the last name for your new employee"
    },
    {
        type: "list",
        name: "roleId",
        message: "Choose a role for your new employee",
        choices: function () {
            return new Promise (function (resolve, reject) {
                const sql = `SELECT role.id, role.title FROM role`;
                db.query(sql, (err, row) => {
                    if (err) {
                        return reject(err);
                    }
                    else {
                        let optionsArr = [];
                        row.forEach(obj => optionsArr.push({name: obj.title, value: obj.id}))
                        resolve(optionsArr)
                    }
                })
            })
        }
    },
    {
        type: "list",
        name: "managerId",
        message: "Choose the manager this employee reports to",
        choices: function () {
            return new Promise (function (resolve, reject) {
                const sql = `SELECT employee.id, CONCAT (employee.first_name, ' ', employee.last_name) manager FROM employee`;
                db.query(sql, (err, row) => {
                    if (err) {
                        return reject(err);
                    }
                    else {
                        let optionsArr = [];
                        row.forEach(obj => optionsArr.push({name: obj.manager, value: obj.id}))
                        resolve(optionsArr)
                    }
                })
            })
        }
    }
];

module.exports = {mainMenuQuestion, addDepartmentQuestion, addRoleQuestion, addEmployeeQuestion};