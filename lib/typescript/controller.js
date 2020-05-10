const TypescriptClass = require("./typescript")
const CLI = require("clui")
const Spinner = CLI.Spinner
const path = require("path")
const { transferContents } = require("../utilities/misc")

TypescriptClass.prototype.serveTypescript = async function (answers) {
  const status = new Spinner("Integrating typescript...")
  status.start()
  const defer = async () => {
    // Go through all packages and change file types to .ts
    // // create a webpack config for typescript
    // const webpackSrcPath = path.join(
    //   __dirname,
    //   "../templates/typescript/webpack.config.babel.js"
    // )
    // const webpackSavPath = "./packages/client/webpack.config.babel.js"
    // transferContents(webpackSrcPath, webpackSavPath)
    // // merge typsecript requirements with webpack package.json
  }
  await defer()
  status.stop()
  return answers
}

module.exports = TypescriptClass
