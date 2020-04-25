const DatabaseClass = require("./database")
const CLI = require("clui")
const Spinner = CLI.Spinner
const fs = require("fs")
const util = require("util")
const writeFile = util.promisify(fs.writeFile)
const appendFile = util.promisify(fs.appendFile)
const database = require("../templates/json/database")

DatabaseClass.prototype.servePostgres = async function (answers) {
  const status = new Spinner("Initializing database...")
  status.start()
  const defer = async () => {
    // create a package.json
    await writeFile("./packages/db/package.json", "")
    await appendFile(
      "./packages/db/package.json",
      JSON.stringify(await database.databaseMerge(), null, 2)
    )
  }
  await defer()
  status.stop()
  return answers
}

module.exports = DatabaseClass
