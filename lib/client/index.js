const inquirer = require("../utilities/inquirer")

async function setupClient(answers) {
  let ClientClass = require(`./${answers.client}.js`)
  let Client = new ClientClass(answers)
  switch (Client.client) {
    case "react":
      await Client.serveReact(answers)
      break
    case "create-react-app":
      await Client.serveCRA(answers)
      break
    case "nextJS":
      Client.serveNextJS(answers)
      break
    case "gatsby":
      Client.serveNextJS(answers)
      break
    default:
      break
  }
  return answers
}

module.exports = {
  run: async (prev) => {
    const answers = await inquirer.chooseClient(prev)
    await setupClient(answers)
    return answers
  },
}
