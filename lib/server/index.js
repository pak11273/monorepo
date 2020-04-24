const inquirer = require("../utilities/inquirer")
const touch = require("touch")
const fs = require("fs")
const lerna = require("../configs/json/lerna.js")
const npm = require("../configs/json/npm")

async function setupServer(answers) {
  let ServerClass = require(`./${answers.framework}.js`)
  let Server = new ServerClass(answers)
  switch (Server.framework) {
    case "express":
      await Server.serveExpress(answers)
      break
    case "koa":
      Server.serveKoa()
      break
    default:
      break
  }
  return answers
}

module.exports = {
  run: async () => {
    const answers = await inquirer.chooseServer()
    await setupServer(answers)
    return answers
  },
}
