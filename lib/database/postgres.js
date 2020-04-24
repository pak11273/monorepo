const DatabaseClass = require("./database")
const { exec } = require("child_process")
const CLI = require("clui")
const Spinner = CLI.Spinner
const util = require("util")
const execProm = util.promisify(exec)

DatabaseClass.prototype.servePostgres = async function (answers) {
  const status = new Spinner("Initializing database...")
  status.start()
  if (answers.template === "none") {
    console.log("work in progress")
    //TODO: pending instructions
    // await execProm("npx express-generator --no-view ./packages/server")
  } else {
    console.log("work in progress")
    // await execProm(
    //   `npx express-generator --view=${answers.template} ./packages/server`
    // )
  }
  status.stop()
  return answers
}

module.exports = DatabaseClass
