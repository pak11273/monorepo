const CLI = require("clui")
const Spinner = CLI.Spinner
const inquirer = require("../utilities/inquirer")
const touch = require("touch")
const fs = require("fs")
const lerna = require("../configs/json/lerna.js")
const npm = require("../configs/json/npm")

function setupServer(answers) {
  let ServerClass = require(`./${answers.framework}.js`)
  let Server = new ServerClass(answers)
  switch (Server.framework) {
    case "express":
      Server.serveExpress()
      break
    case "koa":
      Server.serveKoa()
      break
    default:
      break
  }
}

module.exports = {
  run: async () => {
    const status = new Spinner("Initializing server...")
    try {
      const answers = await inquirer.chooseServer()
      status.start()
      setupServer(answers)
      //   touch("lerna.json")
      //   fs.appendFile(
      //     "lerna.json",
      //     JSON.stringify(await lerna.lernaMerge(answers.lerna), null, 2),
      //     () => null
      //   )
      //   touch("package.json")
      //   fs.appendFile(
      //     "package.json",
      //     JSON.stringify(await npm.npmMerge(answers.lerna), null, 2),
      //     () => null
      //   )
      return answers
    } finally {
      status.stop()
    }
  },
}
