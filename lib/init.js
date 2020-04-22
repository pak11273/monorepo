const CLI = require("clui")
const Spinner = CLI.Spinner
const inquirer = require("./utilities/inquirer")
const touch = require("touch")
const fs = require("fs")
const lerna = require("./configs/json/lerna.js")
const npm = require("./configs/json/npm")

module.exports = {
  run: async () => {
    const status = new Spinner("Initializing lerna and npm...")
    try {
      const res = await inquirer.initialize()
      status.start()
      touch("lerna.json")
      fs.appendFile(
        "lerna.json",
        JSON.stringify(await lerna.lernaMerge(res.lerna), null, 2),
        () => null
      )
      touch("package.json")
      fs.appendFile(
        "package.json",
        JSON.stringify(await npm.npmMerge(res.lerna), null, 2),
        () => null
      )
    } finally {
      status.stop()
    }
  },
}
