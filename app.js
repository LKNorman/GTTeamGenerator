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
    addMembers();
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
        team.push(new Manager(val.managerName, val.managerId, val.managerEmail, val.officeNumber));
    })
};

// function to build out the team members
function addMembers() {
    return inquirer.prompt([
        {
        type: "list",
        name: "memberRole",
        message: "What role is this employee?",
        choices: ["Engineer","Intern"],
        },
        {
        type: "input",
        name: "employeeName",
        message: "What is the employee's name?"
        },
        {
        type: "input",
        name: "employeeId",
        message: "What is the employee's ID?",
        },
        {
        type: "input",
        name: "employeeEmail",
        message: "What is their email address?",
        },
        {
        when: val => val.role === "Engineer",
        type: "input",
        name: "github",
        message: "What is their github username?"
        },
        {
        when: val => val.role === "Intern",
        type: "input",
        name: "school",
        message: "What school do they go to?"
        }
    ])
    .then(val => {
        if (val.role === "Engineer") {
            team.push(new Engineer(val.employeeName, val.employeeId, val.employeeEmail, val.github ));
        } else{
            team.push(new Intern(val.employeeName, val.employeeId, val.employeeEmail, val.school));
        }
        addAnotherMember();
    })
}