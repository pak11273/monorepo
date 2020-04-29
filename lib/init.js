const CLI = require("clui")
const Spinner = CLI.Spinner
const inquirer = require("./utilities/inquirer")
const fs = require("fs")
const path = require("path")
const util = require("util")
const { readFile, writeFile, appendFile } = require("./utilities/misc")
const mkDir = util.promisify(fs.mkdir)
const lernaJson = require("./templates/json/lerna")
const npmJson = require("./templates/json/init")
const baseJson = require("./templates/json/base")

module.exports = {
  mkDirs: async function (answers) {
    var temp = answers.typescript
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
    answers.typescript = temp
    return answers
  },
  run: async function () {
    try {
      const answers = await inquirer.initialize()
      await writeFile("lerna.json", "")
      await appendFile(
        "lerna.json",
        JSON.stringify(await lernaJson.lernaMerge(), null, 2)
      )
      await writeFile("package.json", "")
      await appendFile(
        "package.json",
        JSON.stringify(await npmJson.npmMerge(answers), null, 2)
      )
      // create directories
      await mkDir("packages")

      // create a gitignore file
      const ignoreSrcPath = path.join(__dirname, "./templates/gitignore/.base")
      await writeFile("./.gitignore", "")
      let baseIgnore = await readFile(ignoreSrcPath, "utf8")
      await appendFile("./.gitignore", baseIgnore)

      await this.mkDirs(answers)
      return answers
    } catch (err) {
      console.log(err)
    }
  },
}
