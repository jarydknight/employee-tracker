const inquirer = require("inquirer");
const {routeRequest} = require("./utils/dbQuery");

const mainMenuQuestions = [
    {
        type: "list",
        name: "optionSelect",
        message: "Welcome to the main menu. Please select on option to proceed",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee"]
    }
];

const init = () => {
    inquirer.prompt(mainMenuQuestions).then(routeRequest);
};

init();