const inquirer = require("../utilities/inquirer")

async function setupAdmin(answers) {
  let AdminClass = require("./admin.js")
  // TODO: options for future admin dashboards for corporate and users
  // let AdminClass = require(`./${answers.admin}.js`)
  let Admin = new AdminClass(answers)
  switch (Admin.framework) {
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
    // const answers = await inquirer.chooseAdmin(prev)
    // await setupAdmin(answers)
    // return answers
    await setupAdmin(prev)
    return prev
  },
}
