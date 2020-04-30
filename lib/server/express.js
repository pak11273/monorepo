const ServerClass = require("./server")
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
