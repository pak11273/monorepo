const CLI = require("clui")
const Spinner = CLI.Spinner
const { baseJsonRename } = require("../utilities/misc")

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
    let newPathName = "./packages/admin/package.json"
    let newName = `@${answers.projectName}/admin`
    await baseJsonRename(newPathName, newName)
  }
  await defer()
  status.stop()
  return answers
}
AdminClass.prototype.serveUsers = async function (answers) {}
AdminClass.prototype.serveCorporate = async function (answers) {}

module.exports = AdminClass
