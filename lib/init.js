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
      const answers = await inquirer.initialize()
      status.start()
      touch("lerna.json")
      fs.appendFile(
        "lerna.json",
        JSON.stringify(await lerna.lernaMerge(answers.lerna), null, 2),
        () => null
      )
      touch("package.json")
      fs.appendFile(
        "package.json",
        JSON.stringify(await npm.npmMerge(answers.lerna), null, 2),
        () => null
      )
      // create directories
      fs.mkdir("packages", (err) => {
        if (err) {
          console.log(err)
        }
      })
      Object.keys(answers).forEach((val, i) => {
        if (Object.values(answers)[i] === "yes") {
          fs.mkdir(`packages/${val}`, (err) => {
            if (err) {
              console.log(err)
            }
          })
        }
      })
      return answers
    } finally {
      status.stop()
    }
  },
}
