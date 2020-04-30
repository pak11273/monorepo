const inquirer = require("../utilities/inquirer")

async function setupServer(answers) {
  let ServerClass = require(`./${answers.framework}.js`)
  let Server = new ServerClass(answers)
  switch (answers.framework) {
    case "express":
      await Server.serveExpress(answers)
      break
    case "koa":
      await Server.serveKoa()
      break
    default:
      break
  }
  return answers
}

module.exports = {
  run: async (prev) => {
    let answers = await inquirer.chooseServer(prev)
    answers = { ...prev, ...answers }
    await setupServer(answers)
    return answers
  },
}
