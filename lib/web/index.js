const inquirer = require("../utilities/inquirer")

async function setupWeb(answers) {
  let WebClass = require(`./${answers.web}.js`)
  let Web = new WebClass(answers)
  switch (answers.web) {
    case "nextjs":
      await Web.serveNextJS(answers)
      break
    case "gatsby":
      await Web.serveGatsby(answers)
      break
    case "html":
      await Web.serveHtml(answers)
      break
    default:
      await Web.serveHtml(answers)
      break
  }
  return answers
}

module.exports = {
  run: async (prev) => {
    const answers = await inquirer.chooseWeb(prev)
    const merged = { ...prev, ...answers }
    await setupWeb(merged)
    return answers
  },
}
