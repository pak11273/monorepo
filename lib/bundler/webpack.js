const BundlerClass = require("./bundler")
const CLI = require("clui")
const Spinner = CLI.Spinner
const fs = require("fs")
const path = require("path")
const util = require("util")
const writeFile = util.promisify(fs.writeFile)
const appendFile = util.promisify(fs.appendFile)
const bundler = require("../templates/json/webpack")
const webpackJson = require("../templates/json/webpack")
const { transferContents } = require("../utilities/misc")
const merge = require("lodash/merge")
const config = require("../../config")

BundlerClass.prototype.serveWebpack = async function (answers) {
  const status = new Spinner("Initializing the bundler...")
  status.start()
  const defer = async () => {
    // webpack json depends on what client was chosen, then grab that the client merged json from the store
    // create a package.json
    await writeFile("./packages/client/package.json", "")
    let clientJson = config.store.get("clientJson")
    let mergedJson = merge(clientJson, webpackJson)
    await appendFile(
      "./packages/client/package.json",
      JSON.stringify(mergedJson, null, 2)
    )

    // copy webpack.config.js
    const webpackSrcPath = path.join(
      __dirname,
      "../templates/react/webpack.config.js"
    )
    const webpackSavPath = "./packages/client/webpack.config.js"
    transferContents(webpackSrcPath, webpackSavPath)
  }
  await defer()
  status.stop()
  return answers
}

module.exports = BundlerClass
