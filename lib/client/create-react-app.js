const chalk = require("chalk")

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

ClientClass.prototype.serveCRA = async function (answers) {
  const status = new Spinner("Installing create-react-app...")
  console.log(
    chalk.black.bgMagenta(
      "This might take a several minutes depending on your connection."
    )
  )

  status.start()
  const defer = async () => {
    const str = `yarn create react-app ${
      answers.typescript === "yes" ? "--template typescript" : ""
    } ./packages/client`
    await execProm(str)
  }
  try {
    await defer()
  } catch (err) {
    console.log(err)
  } finally {
    status.stop()
  }
  return answers
}

module.exports = ClientClass
