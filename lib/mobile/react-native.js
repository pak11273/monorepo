const ReactNativeClass = require("./mobile")
const CLI = require("clui")
const Spinner = CLI.Spinner
const path = require("path")
const { baseJsonRename, mkDir } = require("../utilities/misc")
const { transferContents } = require("../utilities/misc")

ReactNativeClass.prototype.serveReactNative = async function (answers) {
  const status = new Spinner("Installing react...")
  status.start()
  const defer = async () => {
    // create a package.json
    let newPathName = "./packages/mobile/package.json"
    let newName = `@${answers.projectName}/mobile`
    await baseJsonRename(newPathName, newName)

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
