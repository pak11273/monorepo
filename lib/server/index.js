const inquirer = require("../utilities/inquirer")

async function setupServer(answers) {
  let ServerClass = require(`./${answers.framework}.js`)
  let Server = new ServerClass(answers)
  switch (Server.framework) {
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
    const answers = await inquirer.chooseServer(prev)
    await setupServer(answers)
    return answers
  },
}
