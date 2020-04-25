const ClientClass = require("./client")
const CLI = require("clui")
const Spinner = CLI.Spinner
const util = require("util")
const fs = require("fs")
const path = require("path")
const writeFile = util.promisify(fs.writeFile)
const appendFile = util.promisify(fs.appendFile)
const mkDir = util.promisify(fs.mkdir)
const client = require("../templates/json/react")
const { transferContents } = require("../utilities/misc")

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
    // create directories
    await mkDir(`packages/client/public`)
    await mkDir(`packages/client/src`)
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
    const basicCSSSrcPath = path.join(__dirname, "../templates/react/App.css")
    const basicCSSSavPath = "./packages/client/src/App.css"
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
