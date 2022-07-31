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

module.exports = {mainMenuQuestion, addDepartmentQuestion, addRoleQuestion};