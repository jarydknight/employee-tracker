const inquirer = require("inquirer");
const {routeRequest} = require("./utils/dbQuery");
const { mainMenuQuestion } = require("./utils/userPrompts");

// Function to initialize application
const init = () => {
    inquirer.prompt(mainMenuQuestion).then(routeRequest);
};

init();