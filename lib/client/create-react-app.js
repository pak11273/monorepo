const chalk = require("chalk")
const path = require("path")
const ClientClass = require("./client")
const { exec } = require("child_process")
const CLI = require("clui")
const Spinner = CLI.Spinner
const util = require("util")
const fs = require("fs")
const execProm = util.promisify(exec)
const mkDir = util.promisify(fs.mkdir)
const writeFile = util.promisify(fs.writeFile)
const appendFile = util.promisify(fs.appendFile)
const client = require("../templates/json/react")
const { transferContents } = require("../utilities/misc")

ClientClass.prototype.serveCRA = async function (answers) {
  const ts = answers.typescript === "yes"
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
    // create directories
    await mkDir(`packages/client/public`)
    await mkDir(`packages/client/src`)
    await mkDir(`packages/client/src/assets`)
    await mkDir(`packages/client/src/assets/images`)
    await mkDir(`packages/client/src/assets/css`)
    await mkDir(`packages/client/src/assets/scss`)
    await mkDir(`packages/client/src/assets/js`)
    await mkDir(`packages/client/src/assets/vendors`)

    // delete unnecessary files and replace old ones
    await defer()
    await execProm(`rm -rf ./packages/client/.git`)
    await execProm(`rm -rf ./packages/client/.gitignore`)
    await execProm(`rm -rf ./packages/client/App.css`)
    await execProm(`rm -rf ./packages/client/App.${ts ? "tsx" : "jsx"}`)
    await execProm(`rm -rf ./packages/client/App.test.${ts ? "tsx" : "jsx"}`)
    await execProm(`rm -rf ./packages/client/logo.svg`)

    const appFileSrcPath = path.join(
      __dirname,
      `../templates/cra/App.${ts ? "tsx" : "jsx"}`
    )
    const appFileSavPath = "./packages/client/src/App.js"
    transferContents(appFileSrcPath, appFileSavPath)
  } catch (err) {
    console.log(err)
  } finally {
    status.stop()
  }
  return answers
}

module.exports = ClientClass
