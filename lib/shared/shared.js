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

    // create a gitignore file
    const ignoreSrcPath = path.join(__dirname, "../templates/gitignore/.base")
    await writeFile("./packages/shared/.gitignore", "")
    let baseIgnore = await readFile(ignoreSrcPath, "utf8")
    await appendFile("./.gitignore", baseIgnore)

    // copy tsconfig (this babelifies js - even if you don't use typescript, much easier than setting up webpack config)
    const tsconfigSrcPath = path.join(
      __dirname,
      "../templates/shared/tsconfig.json"
    )
    const tsconfigSavPath = "./packages/shared/tsconfig.json"
    transferContents(tsconfigSrcPath, tsconfigSavPath)

    // copy basic scss
    const basicCSSSrcPath = path.join(
      __dirname,
      "../../common/templates/scss/app.scss"
    )
    const basicCSSSavPath = "./packages/client/src/assets/scss/app.scss"
    transferContents(basicCSSSrcPath, basicCSSSavPath)

    // copy babelrc
    const babelSrcPath = path.join(__dirname, "../templates/shared/.babelrc")
    const babelSavPath = "./packages/shared/.babelrc"
    transferContents(babelSrcPath, babelSavPath)

    // create components folder
    const indexSrcPath = path.join(
      __dirname,
      `../templates/shared/index.${answers.typescript === "yes" ? "ts" : "js"}`
    )
    const indexSavPath = `./packages/shared/src/components/index.${
      answers.typescript === "yes" ? "ts" : "js"
    }`
    transferContents(indexSrcPath, indexSavPath)

    // create a starter button component
    const btnSrcPath = path.join(
      __dirname,
      `../templates/shared/Button.${answers.typescript === "yes" ? "ts" : "js"}`
    )
    const btnSavPath = `./packages/shared/src/components/Button.${
      answers.typescript === "yes" ? "ts" : "js"
    }`
    transferContents(btnSrcPath, btnSavPath)

    // create a starter theme object
    const themeSrcPath = path.join(
      __dirname,
      `../templates/shared/theme.${answers.typescript === "yes" ? "ts" : "js"}`
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
