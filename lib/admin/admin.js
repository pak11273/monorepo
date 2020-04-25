const CLI = require("clui")
const Spinner = CLI.Spinner
const util = require("util")
const fs = require("fs")
const writeFile = util.promisify(fs.writeFile)
const appendFile = util.promisify(fs.appendFile)
const admin = require("../templates/json/admin")

const AdminClass = function ({ owner }) {
  this.owner = owner
}

AdminClass.prototype.setup = function () {
  console.log("setup admin")
}

AdminClass.prototype.serveDefault = async function (answers) {
  const status = new Spinner("Installing react...")
  status.start()
  const defer = async () => {
    // create a package.json
    await writeFile("./packages/admin/package.json", "")
    await appendFile(
      "./packages/admin/package.json",
      JSON.stringify(await admin.adminMerge(), null, 2)
    )
  }
  await defer()
  status.stop()
  return answers
}
AdminClass.prototype.serveUsers = async function (answers) {}
AdminClass.prototype.serveCorporate = async function (answers) {}

module.exports = AdminClass
