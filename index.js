const inquirer = require("inquirer");
const {routeRequest} = require("./utils/dbQuery");
const { mainMenuQuestion } = require("./utils/userPrompts");

const init = () => {
    inquirer.prompt(mainMenuQuestion).then(routeRequest);
};

init();