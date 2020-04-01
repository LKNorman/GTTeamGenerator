const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// ​array for complete team
var team = [];

// function to build out array
buildTeam();

function buildTeam() {
  addManager();
  addEmployees();
}
// function to prompt the information input for the team manager, first because only one per team
function addManager() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the team manager's name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is their id?"
      },
      {
        type: "input",
        name: "email",
        message: "What is their email address?"
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the managers office number?"
      }
    ])
    .then(val => {
      team.push(new Manager(val.name, val.id, val.email, val.officeNumber));
    });
}

// function to build out the team members
function addEmployees() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "What role is this employee?",
        choices: ["Engineer", "Intern"]
      },
      {
        type: "input",
        name: "name",
        message: "What is the employee's name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is the employee's ID?"
      },
      {
        type: "input",
        name: "email",
        message: "What is their email address?"
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
        team.push(new Engineer(val.name, val.id, val.email, val.github));
      } else {
        team.push(new Intern(val.name, val.id, val.email, val.school));
      }
      // calling the below functions to redo all of the prompts above
      addAnotherEmployee();
    });
}
// asking if there are any more engineers/interns
function addAnotherEmployee() {
  inquire
    .prompt([
      {
        type: "list",
        name: "newEmployee",
        message: "Are there any more employees on this team?",
        choices: ["yes", "no"]
      }
    ])
    .then(val => {
      if (val.addAnotherEmployee === "yes") {
        this.addEmployees();
      } else {
        writeHTML();
      }
    });
}

const writeHTML = () => {
  if (!fs.existsSync("./ouput")) {
    fs.mkdirSync("./output");
  }
  fs.writeFile(outputPath, render(team), err => {
    if (err) throw err;
    console.log("Team.html created");
  });
};

buildTeam();