const DatabaseClass = require("./postgres")
const { exec } = require("child_process")
const CLI = require("clui")
const Spinner = CLI.Spinner
const util = require("util")
const execProm = util.promisify(exec)

DatabaseClass.prototype.serveDatabase = async function (answers) {
  const status = new Spinner("Initializing database...")
  status.start()
  if (answers.template === "none") {
    //TODO: pending instructions
    // await execProm("npx express-generator --no-view ./packages/server")
  } else {
    // await execProm(
    //   `npx express-generator --view=${answers.template} ./packages/server`
    // )
  }
  status.stop()
  return answers
}

module.exports = DatabaseClass
