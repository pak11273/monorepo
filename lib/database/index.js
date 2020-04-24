const inquirer = require("../utilities/inquirer")

async function setupDatabase(answers) {
  let DatabaseClass = require(`./${answers.db}.js`)
  let Database = new DatabaseClass(answers)
  switch (Database.framework) {
    case "postgres":
      await Database.servePostgres(answers)
      break
    case "mongo":
      Database.serveMongo()
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
