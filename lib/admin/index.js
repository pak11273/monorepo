const inquirer = require("../utilities/inquirer")

async function setupAdmin(answers) {
  let AdminClass = require("./admin.js")
  // TODO: options for future admin dashboards for corporate and users
  // let AdminClass = require(`./${answers.admin}.js`)
  let Admin = new AdminClass(answers)
  switch (Admin.option) {
    case "users":
      await Admin.serveUsers(answers)
      break
    case "corporate":
      Admin.serveCorporate(answers)
      break
    default:
      Admin.serveDefault(answers)
      break
  }
  return answers
}

module.exports = {
  run: async (prev) => {
    await setupAdmin(prev)
    return prev
  },
}
