const BundlerClass = require("./bundler")
const CLI = require("clui")
const Spinner = CLI.Spinner
const fs = require("fs")
const path = require("path")
const util = require("util")
const writeFile = util.promisify(fs.writeFile)
const appendFile = util.promisify(fs.appendFile)
const { readFile } = require("../utilities/misc")
const webpackJson = require("../templates/json/webpack")
const merge = require("lodash/merge")
const config = require("../../config")

BundlerClass.prototype.serveWebpack = async function (answers) {
  const status = new Spinner("Initializing the bundler...")
  status.start()
  const defer = async () => {
    if (config.store.get("client") === "react") {
      // webpack json depends on what client was chosen, then grab that the client merged json from the store
      // create a package.json
      await writeFile("./packages/client/package.json", "")
      let clientJson = config.store.get("clientJson")
      let mergedJson = merge(clientJson, webpackJson)
      await appendFile(
        "./packages/client/package.json",
        JSON.stringify(mergedJson, null, 2)
      )

      // copy base webpack.config.js
      const base = await readFile(
        path.join(__dirname, "../templates/webpack/base.txt"),
        "utf-8"
      )
      const dev = await readFile(
        path.join(__dirname, "../templates/webpack/dev.txt"),
        "utf-8"
      )
      const prod = await readFile(
        path.join(__dirname, "../templates/webpack/prod.txt"),
        "utf-8"
      )

      const packs = ["base", "dev", "prod"]
      const webpacks = await Promise.all([base, dev, prod])

      webpacks.forEach((val, i) => {
        fs.writeFile(
          `./packages/client/webpack.${packs[i]}.babel.js`,
          val,
          () => null
        )
      })
    }
  }

  await defer()
  status.stop()
  return answers
}

module.exports = BundlerClass
