const inquirer = require("../utilities/inquirer")
const config = require("../../config")

async function setupClient(answers) {
  let ClientClass = require(`./${answers.client}.js`)
  let Client = new ClientClass(answers)
  switch (answers.client) {
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
      Client.serveGatsby(answers)
      break
    default:
      break
  }
  return answers
}

module.exports = {
  run: async (prev) => {
    const answers = await inquirer.chooseClient(prev)
    config.store.set("client", answers.client)
    const merged = { ...prev, ...answers }
    await setupClient(merged)

    return merged
  },
}
