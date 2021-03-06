const ClientClass = require("./client")
const CLI = require("clui")
const Spinner = CLI.Spinner
const util = require("util")
const fs = require("fs")
const path = require("path")
const mkDir = util.promisify(fs.mkdir)
const { writeFile, appendFile, transferContents } = require("../utilities/misc")
const baseJson = require("../templates/json/base")
const reactJson = require("../templates/json/react")
const merge = require("lodash/merge")
const config = require("../../config")

ClientClass.prototype.serveReact = async function (answers) {
  const status = new Spinner("Installing react...")
  status.start()
  const defer = async () => {
    // create merge base and create package.json
    await writeFile("./packages/client/package.json", "")
    let base = await baseJson.baseJsonMerge({
      name: `@${answers.projectName}/client`,
    })
    let mergedJson = merge(base, reactJson)
    config.store.set("clientJson", mergedJson)
    await appendFile(
      "./packages/client/package.json",
      JSON.stringify(mergedJson, null, 2)
    )

    // create directories
    await mkDir(`packages/client/public`)
    await mkDir(`packages/client/src`)
    await mkDir(`packages/client/src/assets`)
    await mkDir(`packages/client/src/assets/images`)
    await mkDir(`packages/client/src/assets/css`)
    await mkDir(`packages/client/src/assets/scss`)
    await mkDir(`packages/client/src/assets/js`)
    await mkDir(`packages/client/src/assets/vendors`)

    // copy index.html
    const htmlSrcPath = path.join(__dirname, "../templates/react/index.html")
    const htmlSavPath = "./packages/client/public/index.html"
    transferContents(htmlSrcPath, htmlSavPath)

    // copy basic files
    const appFileSrcPath = path.join(__dirname, "../templates/react/App.js")
    const appFileSavPath = "./packages/client/src/App.js"
    transferContents(appFileSrcPath, appFileSavPath)
    const indexFileSrcPath = path.join(__dirname, "../templates/react/index.js")
    const indexFileSavPath = "./packages/client/src/index.js"
    transferContents(indexFileSrcPath, indexFileSavPath)
    const basicCSSSrcPath = path.join(
      __dirname,
      "../../common/templates/scss/app.scss"
    )
    const basicCSSSavPath = "./packages/client/src/assets/scss/app.scss"
    transferContents(basicCSSSrcPath, basicCSSSavPath)

    // copy babelrc
    const babelSrcPath = path.join(__dirname, "../templates/.babelrc")
    const babelSavPath = "./packages/client/.babelrc"
    transferContents(babelSrcPath, babelSavPath)

    // copy manifest.json
    const manifestSrcPath = path.join(
      __dirname,
      "../templates/react/manifest.json"
    )
    const manifestSavPath = "./packages/client/public/manifest.json"
    transferContents(manifestSrcPath, manifestSavPath)

    // copy robots.txt
    const robotsSrcPath = path.join(__dirname, "../templates/react/robots.txt")
    const robotsSavPath = "./packages/client/public/robots.txt"
    transferContents(robotsSrcPath, robotsSavPath)
  }
  await defer()
  status.stop()
  return answers
}

module.exports = ClientClass
