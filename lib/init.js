const CLI = require("clui")
const Spinner = CLI.Spinner
const inquirer = require("./utilities/inquirer")
const fs = require("fs")
const path = require("path")
const util = require("util")
// const writeFile = util.promisify(fs.writeFile)
const { readFile, writeFile, appendFile } = require("./utilities/misc")
// const appendFile = util.promisify(fs.appendFile)
const mkDir = util.promisify(fs.mkdir)
const { transferContents } = require("./utilities/misc")
const lernaJson = require("./templates/json/lerna")
const npmJson = require("./templates/json/npm")
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
        JSON.stringify(await npmJson.npmMerge(answers.projectName), null, 2)
      )
      // create directories
      await mkDir("packages")
      await mkDir("./packages/shared")
      await mkDir("./packages/shared/components")
      await mkDir("./packages/shared/theme")

      // create a gitignore file
      const ignoreSrcPath = path.join(__dirname, "./templates/gitignore/.base")
      await writeFile("./.gitignore", "")
      let baseIgnore = await readFile(ignoreSrcPath, "utf8")
      await appendFile("./.gitignore", baseIgnore)

      // create shared package with package.json
      await writeFile("./packages/shared/package.json", "")
      await appendFile(
        "./packages/shared/package.json",
        JSON.stringify(
          await baseJson.baseJsonMerge({
            name: `@${answers.projectName}/shared`,
          }),
          null,
          2
        )
      )
      const indexSrcPath = path.join(
        __dirname,
        `./templates/shared/index.${answers.typescript === "yes" ? "ts" : "js"}`
      )
      const indexSavPath = `./packages/shared/components/index.${
        answers.typescript === "yes" ? "ts" : "js"
      }`
      transferContents(indexSrcPath, indexSavPath)

      // create a starter button component
      const btnSrcPath = path.join(
        __dirname,
        `./templates/shared/Button.${
          answers.typescript === "yes" ? "ts" : "js"
        }`
      )
      const btnSavPath = `./packages/shared/components/Button.${
        answers.typescript === "yes" ? "ts" : "js"
      }`
      transferContents(btnSrcPath, btnSavPath)

      await this.mkDirs(answers)
      return answers
    } catch (err) {
      console.log(err)
    }
  },
}
