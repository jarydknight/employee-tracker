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



module.exports = {mainMenuQuestion, addDepartmentQuestion};