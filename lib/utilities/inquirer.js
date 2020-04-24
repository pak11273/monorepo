const inquirer = require("inquirer")
const files = require("./files")

module.exports = {
  // initialize
  initialize: () => {
    const argv = require("minimist")(process.argv.slice(2))

    const questions = [
      {
        type: "input",
        name: "lerna",
        message: "Enter a name for monorepo project",
        default: argv._[0] || files.getCurrentDirectoryBase(),
        validate: function (value) {
          if (value.length) {
            return true
          } else {
            return "Please enter a name for the project."
          }
        },
      },
      {
        type: "list",
        name: "mobile",
        message: "Will your project include a mobile app?",
        choices: ["yes", "no"],
        default: "no",
      },
      {
        type: "list",
        name: "client",
        message: "Will your project include a frontend app?",
        choices: ["yes", "no"],
        default: "yes",
      },
      {
        type: "list",
        name: "web",
        message:
          "Will your project include a website? (client-side facing pages)",
        choices: ["yes", "no"],
        default: "yes",
      },
      {
        type: "list",
        name: "server",
        message: "Will your project include a server?",
        choices: ["yes", "no"],
        default: "yes",
      },
      {
        type: "list",
        name: "db",
        message: "Do you want basic scaffolding for a database?",
        choices: ["yes", "no"],
        default: "yes",
      },
    ]
    return inquirer.prompt(questions)
  },
  // server
  chooseServer: (prev) => {
    const questions = [
      {
        type: "list",
        name: "framework",
        message: "Choose a Node Framework",
        choices: ["express"],
        default: "express",
      },
      {
        type: "list",
        name: "template",
        message: "Choose a Templating Language",
        choices: ["hbs", "ejs", "pug", "none"],
        default: "hbs",
      },
      {
        type: "list",
        name: "typescript",
        message: "Do you want your server to work with tyepscript?",
        choices: ["yes", "no"],
        default: "yes",
      },
    ]
    return inquirer.prompt(questions)
  },
  // client
  chooseClient: (prev) => {
    const questions = [
      {
        type: "list",
        name: "client",
        message: "Choose which front-end client to setup?",
        choices: ["react"],
        default: "react",
      },
    ]
    return inquirer.prompt(questions)
  },
  // database
  chooseDatabase: (prev) => {
    const argv = require("minimist")(process.argv.slice(2))
    const questions = [
      {
        type: "list",
        name: "db",
        message: "Choose which basic scaffolding you want for a database?",
        choices: ["postgres"],
        default: "postgres",
      },
      {
        type: "list",
        name: "orm",
        message: "Include an orm?",
        choices: ["typeorm"],
        default: "typeorm",
      },
    ]
    return inquirer.prompt(questions)
  },
  askVersionControl: () => {
    const questions = [
      {
        type: "list",
        name: "version",
        message: "Choose your version control:",
        choices: ["Github", "Bitbucket"],
        default: "Github",
      },
    ]
    return inquirer.prompt(questions)
  },
  askGithubCredentials: () => {
    const questions = [
      {
        name: "username",
        type: "input",
        message: "Enter your GitHub username or e-mail address:",
        validate: function (value) {
          if (value.length) {
            return true
          } else {
            return "Please enter your username or e-mail address."
          }
        },
      },
      {
        name: "password",
        type: "password",
        message: "Enter your password:",
        validate: function (value) {
          if (value.length) {
            return true
          } else {
            return "Please enter your password."
          }
        },
      },
    ]
    return inquirer.prompt(questions)
  },

  getTwoFactorAuthenticationCode: () => {
    return inquirer.prompt({
      name: "twoFactorAuthenticationCode",
      type: "input",
      message: "Enter your two-factor authentication code:",
      validate: function (value) {
        if (value.length) {
          return true
        } else {
          return "Please enter your two-factor authentication code."
        }
      },
    })
  },

  askRepoDetails: () => {
    const argv = require("minimist")(process.argv.slice(2))

    const questions = [
      {
        type: "input",
        name: "name",
        message: "Enter a name for the repository:",
        default: argv._[0] || files.getCurrentDirectoryBase(),
        validate: function (value) {
          if (value.length) {
            return true
          } else {
            return "Please enter a name for the repository."
          }
        },
      },
      {
        type: "input",
        name: "description",
        default: argv._[1] || null,
        message: "Optionally enter a description of the repository:",
      },
      {
        type: "list",
        name: "visibility",
        message: "Public or private:",
        choices: ["public", "private"],
        default: "public",
      },
    ]
    return inquirer.prompt(questions)
  },

  askIgnoreFiles: (filelist) => {
    const questions = [
      {
        type: "checkbox",
        name: "ignore",
        message: "Select the files and/or folders you wish to ignore:",
        choices: filelist,
        default: ["node_modules", "bower_components"],
      },
    ]
    return inquirer.prompt(questions)
  },
}
