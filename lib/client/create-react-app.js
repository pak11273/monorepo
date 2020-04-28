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
const { readFile, writeFile } = require("../utilities/misc")
const client = require("../templates/json/react")
const { transferContents } = require("../utilities/misc")
const merge = require("package-merge")

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
      ts ? "--template typescript" : ""
    } ./packages/client`
    let done = await execProm(str)
    return done
  }
  try {
    // install cra
    await defer()

    // delete old files and replace
    await execProm(`rm -rf ./packages/client/.git`)
    await execProm(`rm -rf ./packages/client/.gitignore`)
    await execProm(`rm -rf ./packages/client/src/logo.svg`)
    await execProm(`rm -rf ./packages/client/src/App.css`)
    await execProm(`rm -rf ./packages/client/src/index.css`)
    await execProm(`rm -rf ./packages/client/src/index.${ts ? "tsx" : "jsx"}`)
    await execProm(`rm -rf ./packages/client/src/App.${ts ? "tsx" : "jsx"}`)
    await execProm(
      `rm -rf ./packages/client/src/App.test.${ts ? "tsx" : "jsx"}`
    )

    // create directories
    await mkDir(`packages/client/src/assets`)
    await mkDir(`packages/client/src/assets/images`)
    await mkDir(`packages/client/src/assets/css`)
    await mkDir(`packages/client/src/assets/scss`)
    await mkDir(`packages/client/src/assets/js`)
    await mkDir(`packages/client/src/assets/vendors`)

    // create new App file
    const appFileSrcPath = path.join(
      __dirname,
      `../templates/cra/App.${ts ? "tsx" : "jsx"}`
    )
    await writeFile(`./packages/client/src/App.${ts ? "tsx" : "jsx"}`, "")
    const appFileSavPath = `./packages/client/src/App.${ts ? "tsx" : "jsx"}`
    transferContents(appFileSrcPath, appFileSavPath)

    // create new index file
    const indexFileSrcPath = path.join(
      __dirname,
      `../templates/cra/index.${ts ? "tsx" : "jsx"}`
    )
    await writeFile(`./packages/client/src/index.${ts ? "tsx" : "jsx"}`, "")
    const indexFileSavPath = `./packages/client/src/index.${ts ? "tsx" : "jsx"}`
    transferContents(indexFileSrcPath, indexFileSavPath)

    // insert a basic scss for App
    const appScssFileSrcPath = path.join(__dirname, `../templates/cra/app.scss`)
    const appScssFileSavPath = `./packages/client/src/assets/scss/app.scss`
    transferContents(appScssFileSrcPath, appScssFileSavPath)

    // insert a basic scss for index
    const indexScssFileSrcPath = path.join(
      __dirname,
      `../templates/cra/index.scss`
    )
    const indexScssFileSavPath = `./packages/client/src/assets/scss/index.scss`
    transferContents(indexScssFileSrcPath, indexScssFileSavPath)

    // add node-sass to package.json and install it
    // let craJson = await readFile(`../templates/json/cra.json`)
    // let installedJson = await readFile("./package/client/package.json")
    // let mergedJson = merge(installedJson, craJson)
    // transferContents(mergedJson, craJson)
    await execProm(`yarn add -D node-sass@^4.14.0`)
  } catch (err) {
    console.log(err)
  } finally {
    status.stop()
  }
  return answers
}

module.exports = ClientClass
