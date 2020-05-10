const CLI = require("clui")
const Spinner = CLI.Spinner
const util = require("util")
const fs = require("fs")
const path = require("path")
const mkDir = util.promisify(fs.mkdir)
const sharedJson = require("../templates/json/shared")
const {
  readFile,
  writeFile,
  appendFile,
  transferContents,
  transferDirFiles,
} = require("../utilities/misc")
const baseJson = require("../templates/json/base")
const merge = require("lodash/merge")
const config = require("../../config")

const SharedClass = function ({ client }) {
  this.client = client
  this.shared = "typescript"
}

SharedClass.prototype.setup = function () {
  console.log("setup shared")
}

// Pending special functions per need basis
SharedClass.prototype.serveSharedWithReact = async function (answers) {}
SharedClass.prototype.serveSharedWithCRA = async function (answers) {}
SharedClass.prototype.serveSharedWithNext = async function (answers) {}
SharedClass.prototype.serveSharedWithGatsby = async function (answers) {}
SharedClass.prototype.serveSharedWithReact = async function (answers) {}

SharedClass.prototype.serveShared = async function (answers) {
  const ts = answers.typescript === "yes"
  const status = new Spinner("Installing the shared package...")
  status.start()

  const defer = async () => {
    // create directories
    await mkDir("./packages/shared")
    await mkDir(`./packages/shared/src`)
    await mkDir(`./packages/shared/src/assets`)
    await mkDir(`./packages/shared/src/assets/images`)
    await mkDir(`./packages/shared/src/assets/css`)
    await mkDir(`./packages/shared/src/assets/scss`)
    await mkDir(`./packages/shared/src/assets/js`)
    await mkDir(`./packages/shared/src/assets/vendors`)
    await mkDir(`./packages/shared/src/components`)
    await mkDir(`./packages/shared/src/components/Button`)
    await mkDir(`./packages/shared/src/theme`)

    // create merge base and create package.json
    await writeFile("./packages/shared/package.json", "")
    let base = await baseJson.baseJsonMerge({
      name: `@${answers.projectName}/shared`,
    })
    let mergedJson = merge(base, sharedJson)
    config.store.set("sharedJson", mergedJson)
    await appendFile(
      "./packages/shared/package.json",
      JSON.stringify(mergedJson, null, 2)
    )

    // NOTE: we are using tscompiler for transpilation, so you must create components with .tsx
    // transfer index.js
    const indexSrcPath = path.join(__dirname, `../templates/shared/index.js`)
    const indexSavPath = `./packages/shared/src/index.tsx` // use .tsx extension!
    transferContents(indexSrcPath, indexSavPath)

    // transfer directory
    const dirPath = path.join(__dirname, `../templates/shared/directory`)
    const destPath = `./packages/shared`
    transferDirFiles(dirPath, destPath, "ts")

    // transfer tsconfig.json
    const tsSrcPath = path.join(__dirname, `../templates/shared/tsconfig.json`)
    const tsSavPath = `./packages/shared/tsconfig.json`
    transferContents(tsSrcPath, tsSavPath)

    // copy basic scss
    const basicCSSSrcPath = path.join(
      __dirname,
      "../../common/templates/scss/app.scss"
    )
    const basicCSSSavPath = "./packages/client/src/assets/scss/app.scss"
    transferContents(basicCSSSrcPath, basicCSSSavPath)

    // NOTE: we are using tscompiler for transpilation, so you must create components with .tsx
    // create a starter button component
    const btnSrcPath = path.join(
      __dirname,
      `../templates/shared/components/Button/index.js`
    )
    const btnSavPath = `./packages/shared/src/components/Button/index.tsx` // use .tsx extensions!
    transferContents(btnSrcPath, btnSavPath)

    // create a starter theme object
    const themeSrcPath = path.join(
      __dirname,
      `../templates/shared/theme/index.js`
    )
    const themeSavPath = `./packages/shared/src/theme/index.${
      answers.typescript === "yes" ? "ts" : "js"
    }`
    transferContents(themeSrcPath, themeSavPath)
  }
  await defer()
  status.stop()
  return answers
}

module.exports = SharedClass
