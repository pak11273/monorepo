const ClientClass = require("./client")
const { exec } = require("child_process")
const CLI = require("clui")
const Spinner = CLI.Spinner
const util = require("util")
const fs = require("fs")
const execProm = util.promisify(exec)
const writeFile = util.promisify(fs.writeFile)
const appendFile = util.promisify(fs.appendFile)
const client = require("../templates/json/react")

ClientClass.prototype.serveReact = async function (answers) {
  const status = new Spinner("Installing react...")
  status.start()
  const defer = async () => {
    // create a package.json
    await writeFile("./packages/client/package.json", "")
    await appendFile(
      "./packages/client/package.json",
      JSON.stringify(await client.reactMerge(), null, 2)
    )
  }
  await defer()
  status.stop()
  return answers
}

module.exports = ClientClass
