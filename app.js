const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// ​array for complete team and boolean to make sure manager is forced first
var team = [];
var hasManager = false;

// function to prompt the information input for the team manager, first because only one per team
const addEmployees = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "What role is this employee?",
        choices: () => {
          if (hasManager === false) {
            hasManager = true;
            return ["Manager"];
          } else {
            return ["Engineer", "Intern"];
          }
        }
      },
      {
        type: "input",
        name: "name",
        message: "What is this employee's name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is this employee's id?"
      },
      {
        type: "input",
        name: "email",
        message: "What is this employee's email address?"
      },
      {
        when: val => val.role === "Manager",
        type: "input",
        name: "officeNumber",
        message: "What is this employee's office number?"
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
      if (val.role === "Manager") {
        team.push(new Manager(val.name, val.id, val.email, val.officeNumber));
      } else if (val.role === "Engineer") {
        team.push(new Engineer(val.name, val.id, val.email, val.github));
      } else {
        team.push(new Intern(val.name, val.id, val.email, val.school));
      }
      addAnotherEmployee();
    });
  // asking if there are any more engineers/interns
  function addAnotherEmployee() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "newEmployee",
          message: "Are there any more employees on this team?",
          choices: ["yes", "no"]
        }
      ])
      .then(val => {
        if (val.newEmployee === "yes") {
          addEmployees();
        } else {
          writeHTML();
        }
      });
    // writes the html output
    const writeHTML = () => {
      if (!fs.existsSync("./ouput")) {
        fs.mkdirSync("./output");
      }
      fs.writeFile(outputPath, render(team), err => {
        if (err) throw err;
        console.log("Team.html created");
      });
    };
  }
};
addEmployees();
