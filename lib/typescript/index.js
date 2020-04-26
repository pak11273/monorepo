// const inquirer = require("../utilities/inquirer")

async function setupTypescript(answers) {
  // let TypescriptClass = require(`./${answers.typescript}.js`)
  let TypescriptClass = require(`./controller.js`)
  let Typescript = new TypescriptClass(answers)
  console.log("TYPESCRIPT: answers", answers)
  switch (answers.typescript) {
    case "pending":
      await Typescript.servePending(answers)
      break
    default:
      await Typescript.serveTypescript(answers)
      break
  }
  return answers
}

module.exports = {
  run: async (prev) => {
    // const answers = await inquirer.chooseTypescript(prev)
    // await setupTypescript(answers)
    // return answers
    await setupTypescript(prev)
    return prev
  },
}
