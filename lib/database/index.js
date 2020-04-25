const inquirer = require("../utilities/inquirer")

async function setupDatabase(answers) {
  let DatabaseClass = require(`./${answers.db}.js`)
  let Database = new DatabaseClass(answers)
  switch (answers.db) {
    case "postgres":
      await Database.servePostgres(answers)
      break
    case "mongo":
      Database.serveMongo()
      break
    case "mysql":
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
