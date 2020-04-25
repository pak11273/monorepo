const BundlerClass = require("./bundler")
const CLI = require("clui")
const Spinner = CLI.Spinner
const fs = require("fs")
const util = require("util")
const writeFile = util.promisify(fs.writeFile)
const appendFile = util.promisify(fs.appendFile)
const bundler = require("../templates/json/webpack")

BundlerClass.prototype.serveWebpack = async function (answers) {
  const status = new Spinner("Initializing the bundler...")
  status.start()
  const defer = async () => {
    // create a package.json
    await writeFile("./packages/client/package.json", "")
    await appendFile(
      "./packages/client/package.json",
      JSON.stringify(await bundler.webpackMerge(), null, 2)
    )
  }
  await defer()
  status.stop()
  return answers
}

module.exports = BundlerClass
