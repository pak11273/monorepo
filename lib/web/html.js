const WebClass = require("./web")
const CLI = require("clui")
const Spinner = CLI.Spinner
const util = require("util")
const fs = require("fs")
const path = require("path")
const writeFile = util.promisify(fs.writeFile)
const appendFile = util.promisify(fs.appendFile)
const mkDir = util.promisify(fs.mkdir)
const web = require("../templates/json/web")
const { transferContents } = require("../utilities/misc")

WebClass.prototype.serveHtml = async function (answers) {
  const status = new Spinner("Installing react...")
  status.start()
  const defer = async () => {
    // create a package.json
    await writeFile("./packages/web/package.json", "")
    await appendFile(
      "./packages/web/package.json",
      JSON.stringify(await web.webMerge(), null, 2)
    )
    // create directories
    await mkDir(`packages/web/public`)
    await mkDir(`packages/web/src`)
    // copy index.html
    const htmlSrcPath = path.join(__dirname, "../templates/web/index.html")
    const htmlSavPath = "./packages/web/public/index.html"
    transferContents(htmlSrcPath, htmlSavPath)
    // copy manifest.json
    const manifestSrcPath = path.join(
      __dirname,
      "../templates/web/manifest.json"
    )
    const manifestSavPath = "./packages/web/public/manifest.json"
    transferContents(manifestSrcPath, manifestSavPath)
    // copy robots.txt
    const robotsSrcPath = path.join(__dirname, "../templates/web/robots.txt")
    const robotsSavPath = "./packages/web/public/robots.txt"
    transferContents(robotsSrcPath, robotsSavPath)
  }
  await defer()
  status.stop()
  return answers
}

module.exports = WebClass
