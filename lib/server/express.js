const ServerClass = require("./server")
const { exec } = require("child_process")
const CLI = require("clui")
const Spinner = CLI.Spinner
const util = require("util")
const execProm = util.promisify(exec)

ServerClass.prototype.serveExpress = async function (answers) {
  const status = new Spinner("Initializing server...")
  status.start()
  if (answers.template === "none") {
    await execProm("npx express-generator --no-view ./packages/server")
  } else {
    await execProm(
      `npx express-generator --view=${answers.template} ./packages/server`
    )
  }
  status.stop()
  return answers
}

module.exports = ServerClass
