const CLI = require("clui")
const Spinner = CLI.Spinner
const inquirer = require("./utilities/inquirer")
const fs = require("fs")
const util = require("util")
const writeFile = util.promisify(fs.writeFile)
const appendFile = util.promisify(fs.appendFile)
const mkDir = util.promisify(fs.mkdir)
const lerna = require("./templates/json/lerna")
const npm = require("./templates/json/npm")
const shared = require("./templates/json/shared")

module.exports = {
  mkDirs: async function (answers) {
    const status = new Spinner("Initializing lerna and npm...")
    status.start()

    const defer = async () => {
      delete answers.typescript
      let dirs = Object.keys(answers)
      dirs.forEach(async (val) => {
        if (answers[val] === "yes") {
          await mkDir(`packages/${val}`)
        }
      })
    }
    try {
      await defer()
    } catch (err) {
      console.log(err)
    } finally {
      status.stop()
    }
  },
  run: async function () {
    try {
      const answers = await inquirer.initialize()
      await writeFile("lerna.json", "")
      await appendFile(
        "lerna.json",
        JSON.stringify(await lerna.lernaMerge(answers.lerna), null, 2)
      )
      await writeFile("package.json", "")
      await appendFile(
        "package.json",
        JSON.stringify(await npm.npmMerge(answers.lerna), null, 2)
      )
      // create directories
      mkDir("packages")
      mkDir("./packages/shared")
      // create shared package with package.json
      writeFile("./packages/shared/package.json", "")
      appendFile(
        "./packages/shared/package.json",
        JSON.stringify(await shared.sharedMerge(), null, 2)
      )
      await this.mkDirs(answers)
      return answers
    } catch (err) {
      console.log(err)
    }
  },
}
