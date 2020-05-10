const ServerClass = require("./server")
const path = require("path")
const CLI = require("clui")
const Spinner = CLI.Spinner
const {
  execProm,
  writeFile,
  appendFile,
  transferContents,
} = require("../utilities/misc")
const baseJson = require("../templates/json/base")
const expressJson = require("../templates/json/express")
const merge = require("lodash/merge")
const config = require("../../config")

ServerClass.prototype.serveExpress = async function (answers) {
  const status = new Spinner("Initializing server...")
  status.start()
  if (answers.template === "none") {
    await execProm("npx express-generator --no-view ./packages/server")
  } else {
    await execProm(
      `npx express-generator --view=${answers.template} ./packages/server`
    )
  }
  // Rewrite www file
  const wwwSrcPath = path.join(__dirname, "../templates/server/express/www")
  await writeFile(`./packages/server/bin/www`, "")
  const wwwSavPath = `./packages/server/bin/www`
  transferContents(wwwSrcPath, wwwSavPath)
  // adds tsconfig
  if (answers.typescript === "yes") {
    const sharedTsSrcPath = path.join(
      __dirname,
      "../templates/shared/tsconfig.json"
    )
    await writeFile(`./packages/server/tsconfig.json`, "")
    const serverTsSavPath = `./packages/server/tsconfig.json`
    transferContents(sharedTsSrcPath, serverTsSavPath)
  }
  // create merge base and create package.json
  await writeFile("./packages/server/package.json", "")
  let base = await baseJson.baseJsonMerge({
    name: `@${answers.projectName}/server`,
  })
  let mergedJson = merge(base, expressJson)
  config.store.set("expressJson", mergedJson)
  await appendFile(
    "./packages/server/package.json",
    JSON.stringify(mergedJson, null, 2)
  )

  status.stop()
  return answers
}

module.exports = ServerClass
