const inquirer = require("../utilities/inquirer")

async function setupDatabase(answers) {
  let ServerClass = require(`./${answers.framework}.js`)
  let Server = new ServerClass(answers)
  switch (Server.framework) {
    case "postgres":
      await Server.servePostgres(answers)
      break
    case "mongo":
      Server.serveMongo()
      break
    default:
      break
  }
  return answers
}

module.exports = {
  run: async (prev) => {
    const answers = await inquirer.chooseDatabase(prev)
    await setupDatabase(answers)
    return answers
  },
}
