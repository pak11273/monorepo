const CLI = require("clui")
const Spinner = CLI.Spinner
const inquirer = require("./utilities/inquirer")
const { transferContents } = require("./utilities/misc")
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

      // if typescript create a global tsconfig
      if (answers.typescript) {
        const globalTsSrcPath = path.join(
          __dirname,
          "./templates/typescript/globalTsConfig.json"
        )
        // global
        await writeFile(`./tsconfig.json`, "")
        const globalTsSavPath = `./tsconfig.json`
        transferContents(globalTsSrcPath, globalTsSavPath)
      }

      await this.mkDirs(answers)

      // other packages
      const defer = async () => {
        const sharedTsSrcPath = path.join(
          __dirname,
          "./templates/shared/tsconfig.json"
        )
        if (answers.admin === "yes") {
          await writeFile(`./packages/admin/tsconfig.json`, "")
          const adminTsSavPath = `./packages/admin/tsconfig.json`
          transferContents(sharedTsSrcPath, adminTsSavPath)
        }
        if (answers.client === "yes") {
          await writeFile(`./packages/client/tsconfig.json`, "")
          const clientTsSavPath = `./packages/client/tsconfig.json`
          transferContents(sharedTsSrcPath, clientTsSavPath)
        }
        if (answers.db === "yes") {
          await writeFile(`./packages/db/tsconfig.json`, "")
          const dbTsSavPath = `./packages/db/tsconfig.json`
          transferContents(sharedTsSrcPath, dbTsSavPath)
        }
        if (answers.mobile === "yes") {
          await writeFile(`./packages/mobile/tsconfig.json`, "")
          const mobileTsSavPath = `./packages/mobile/tsconfig.json`
          transferContents(sharedTsSrcPath, mobileTsSavPath)
        }
        // if (answers.server === "yes") {
        //   await writeFile(`./packages/server/tsconfig.json`, "")
        //   const serverTsSavPath = `./packages/server/tsconfig.json`
        //   transferContents(sharedTsSrcPath, serverTsSavPath)
        // }
        if (answers.web === "yes") {
          await writeFile(`./packages/web/tsconfig.json`, "")
          const webTsSavPath = `./packages/web/tsconfig.json`
          transferContents(sharedTsSrcPath, webTsSavPath)
        }
        return "done"
      }
      await defer()
      return answers
    } catch (err) {
      console.log(err)
    }
  },
}
