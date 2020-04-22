const CLI = require("clui")
const Spinner = CLI.Spinner
const inquirer = require("./utilities/inquirer")
const touch = require("touch")
const fs = require("fs")
const lernaJson = require("./data/json/lerna.json")

module.exports = {
  run: async () => {
    const status = new Spinner("Initializing npm and lerna...")
    try {
      // pending
      const res = await inquirer.initialize()
      status.start()
      // TODO: write lerna project name to lerna.json
      touch("lerna.json")
      fs.appendFile(
        "lerna.json",
        JSON.stringify(lernaJson, null, 2),
        () => null
      )
    } finally {
      status.stop()
    }
  },
}
