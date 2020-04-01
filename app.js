const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
// ​array for complete team
var team = [];
​
// function to build out array
buildTeam();

function buildTeam() {
    addManager();
    addTeam();
}

// function to prompt the information input for the team manager, first because only one per team
function addManager() {
    return inquirer.prompt([
        {
        type: "input",
        name: "managerName",
        message: "What is the team manager's name?"
        },
        {
        type: "input",
        name: "managerId",
        message: "What is their id?"
        },
        {
        type: "input",
        name:"managerEmail",
        message: "What is their email address?"
        },
        {
        type: "input",
        name: "officeNumber",
        message: "What is the managers office number?"
        }
    ])
    .then(val => {
        team.push(Manager(val.managerName, val.managerId, val.managerEmail, val.officeNumber));
    })
};