const ReactNativeClass = require("./mobile")
const CLI = require("clui")
const Spinner = CLI.Spinner
const util = require("util")
const fs = require("fs")
const path = require("path")
const writeFile = util.promisify(fs.writeFile)
const appendFile = util.promisify(fs.appendFile)
const mkDir = util.promisify(fs.mkdir)
const mobile = require("../templates/json/react-native")
const { transferContents } = require("../utilities/misc")

ReactNativeClass.prototype.serveReactNative = async function (answers) {
  const status = new Spinner("Installing react...")
  status.start()
  const defer = async () => {
    // create a package.json
    await writeFile("./packages/mobile/package.json", "")
    await appendFile(
      "./packages/mobile/package.json",
      JSON.stringify(await mobile.reactNativeMerge(), null, 2)
    )
    // create directories
    await mkDir(`packages/mobile/public`)
    await mkDir(`packages/mobile/src`)
    // copy index.html
    const htmlSrcPath = path.join(
      __dirname,
      "../templates/react-native/index.html"
    )
    const htmlSavPath = "./packages/mobile/public/index.html"
    transferContents(htmlSrcPath, htmlSavPath)
    // copy manifest.json
    const manifestSrcPath = path.join(
      __dirname,
      "../templates/react-native/manifest.json"
    )
    const manifestSavPath = "./packages/mobile/public/manifest.json"
    transferContents(manifestSrcPath, manifestSavPath)
    // copy robots.txt
    const robotsSrcPath = path.join(
      __dirname,
      "../templates/react-native/robots.txt"
    )
    const robotsSavPath = "./packages/mobile/public/robots.txt"
    transferContents(robotsSrcPath, robotsSavPath)
  }
  await defer()
  status.stop()
  return answers
}

module.exports = ReactNativeClass
