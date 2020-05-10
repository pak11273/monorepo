const NextJSClass = require("./web")
const CLI = require("clui")
const Spinner = CLI.Spinner
// const util = require("util")
// const fs = require("fs")
const path = require("path")
// const writeFile = util.promisify(fs.writeFile)
// const appendFile = util.promisify(fs.appendFile)
// const mkDir = util.promisify(fs.mkdir)
const {
  execProm,
  transferContents,
  transferDirFiles,
  writeFile,
  appendFile,
  mkDir,
} = require("../utilities/misc")
const baseJson = require("../templates/json/base")
const nextJson = require("../templates/json/next")
const merge = require("lodash/merge")
const config = require("../../config")

NextJSClass.prototype.serveNextJS = async function (answers) {
  const ts = answers.typescript === "yes"
  const status = new Spinner("Installing nextJS...")
  status.start()
  const defer = async () => {
    // create merge base and create package.json
    await writeFile("./packages/web/package.json", "")
    let base = await baseJson.baseJsonMerge({
      name: `@${answers.projectName}/web`,
    })
    let mergedJson = merge(base, nextJson)
    config.store.set("webJson", mergedJson)
    await appendFile(
      "./packages/web/package.json",
      JSON.stringify(mergedJson, null, 2)
    )

    // create directories
    await mkDir(`packages/web/components`)
    await mkDir(`packages/web/pages`)
    await mkDir(`packages/web/public`)
    await mkDir(`packages/web/public/assets`)
    await mkDir(`packages/web/public/assets/images`)
    await mkDir(`packages/web/src`)
    await mkDir(`packages/web/src/assets`)
    await mkDir(`packages/web/src/assets/css`)
    await mkDir(`packages/web/src/assets/scss`)
    await mkDir(`packages/web/src/assets/js`)
    await mkDir(`packages/web/src/assets/vendors`)

    // add pages
    const dirPath = path.join(__dirname, `../templates/next/pages`)
    const destPath = `./packages/web/pages`
    transferDirFiles(dirPath, destPath, "tsx")

    // create basic scss file
    const basicCSSSrcPath = path.join(
      __dirname,
      "../../common/templates/scss/app.scss"
    )
    const basicCSSSavPath = "./packages/web/src/assets/scss/app.scss"
    transferContents(basicCSSSrcPath, basicCSSSavPath)

    // copy .nev
    const envSrcPath = path.join(__dirname, "../templates/next/.env")
    const envSavPath = "./packages/web/.env"
    transferContents(envSrcPath, envSavPath)

    // copy robots.txt
    const robotsSrcPath = path.join(__dirname, "../templates/react/robots.txt")
    const robotsSavPath = "./packages/web/public/robots.txt"
    transferContents(robotsSrcPath, robotsSavPath)
  }
  await defer()
  status.stop()
  return answers
}

module.exports = NextJSClass
