const CLI = require("clui")
const Spinner = CLI.Spinner
const inquirer = require("./utilities/inquirer")
const touch = require("touch")
const fs = require("fs")
const lerna = require("./configs/json/lerna.js")
const npm = require("./configs/json/npm")
const util = require("util")
const mkDir = util.promisify(fs.mkdir)

module.exports = {
  mkDirs: async function (answers) {
    const status = new Spinner("Initializing lerna and npm...")
    status.start()

    const defer = async () => {
      Object.keys(answers).forEach(async (val, i) => {
        if (Object.values(answers)[i] === "yes") {
          await mkDir(`packages/${val}`)
        }
      })
    }
    await defer()
    status.stop()
  },
  run: async function () {
    try {
      const answers = await inquirer.initialize()
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
      await this.mkDirs(answers)
    } finally {
    }
  },
}
