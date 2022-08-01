const db = require("../db/connection");

// Question array used to prompt user for main menu options
const mainMenuQuestion = [
    {
        type: "list",
        name: "optionSelect",
        message: "Welcome to the main menu. Please select on option to proceed",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee", "EXIT"]
    }
];

// Question array used to prompt user for adding a new department
const addDepartmentQuestion = [
    {
        type: "input",
        name: "departmentName",
        message: "Enter a name for the new department"
    }
];

// Question array used to prompt user for adding a new role
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
        // USE OF FUNCTION AS VALUE FOR CHOICES KEY IS THE SAME IN THE FOLLOWING OBJECTS THAT USE THE SAME SETUP. THE DESCRIPTION HERE WILL APPLY TO FUNCTIONS USED AS VALUE FOR CHOICES KEY BELOW

        // choices can accept a function that returns an array. This function works by creating a promise which makes a call to the db to get information about the departments to present to the user
        choices: function () {
            return new Promise (function (resolve, reject) {
                const sql = `SELECT * FROM department`;
                // db query
                db.query(sql, (err, row) => {
                    if (err) {
                        return reject(err);
                    }
                    else {
                        // Once db query complete an option array is initialized and objects are pushed to the array. Inquirer accepts arrays of objects. objects can have name key which will be option presented to the user and value key which is what will be stored as the answer
                        let optionsArr = [];
                        row.forEach(obj => optionsArr.push({name: obj.name, value: obj.id}))
                        // Resolve optionsArr returns the array of objects with the name and value keys
                        resolve(optionsArr)
                    }
                })
            })
        }
    }
];

// Question array used to prompt user for adding a new employee
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
                        // optionsArr starts with NULL as the first item so that the user is given the option to have no manager for the employee (null value in the db)
                        let optionsArr = ["NULL"];
                        row.forEach(obj => optionsArr.push({name: obj.manager, value: obj.id}))
                        resolve(optionsArr)
                    }
                })
            })
        }
    }
];

// Question array to prompt user for updating an employee role
const updateEmployeeQuestion = [
    {
        type: "list",
        name: "employeeId",
        message: "Select the employee you wish to update",
        choices: function () {
            return new Promise (function (resolve, reject) {
                const sql = `SELECT employee.id, CONCAT (employee.first_name, ' ', employee.last_name) employee FROM employee`;
                db.query(sql, (err, row) => {
                    if (err) {
                        return reject(err);
                    }
                    else {
                        let optionsArr = [];
                        row.forEach(obj => optionsArr.push({name: obj.employee, value: obj.id}))
                        resolve(optionsArr)
                    }
                })
            })
        }
    },
    {
        type: "list",
        name: "newRole",
        message: "Select a new role for the employee",
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
    }
];

module.exports = {mainMenuQuestion, addDepartmentQuestion, addRoleQuestion, addEmployeeQuestion, updateEmployeeQuestion};