const DatabaseClass = require("./database")
const CLI = require("clui")
const Spinner = CLI.Spinner
const fs = require("fs")
const util = require("util")
const { baseJsonRename } = require("../utilities/misc")

DatabaseClass.prototype.servePostgres = async function (answers) {
  const status = new Spinner("Initializing database...")
  status.start()
  const defer = async () => {
    // create a package.json
    let newPathName = "./packages/db/package.json"
    let newName = `@${answers.projectName}/db`
    await baseJsonRename(newPathName, newName)
  }
  await defer()
  status.stop()
  return answers
}

module.exports = DatabaseClass
