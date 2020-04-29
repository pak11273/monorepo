const inquirer = require("../utilities/inquirer")

async function setupShared(answers) {
  let SharedClass = require(`./shared.js`)
  let Shared = new SharedClass(answers)
  switch (answers.client) {
    case "react":
      await Shared.serveShared(answers)
      break
    case "cra":
      await Shared.serveShared(answers)
      break
    case "next":
      await Shared.serveShared(answers)
      break
    case "gatsby":
      await Shared.serveShared(answers)
      break
    default:
      await Shared.serveShared(answers)
      break
  }
  return answers
}

module.exports = {
  run: async (prev) => {
    await setupShared(prev)
    return prev
  },
}
