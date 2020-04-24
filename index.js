#!/usr/bin/env node

const chalk = require("chalk")
const clear = require("clear")
const figlet = require("figlet")

const VCFunc = require("./lib/utilities/version-control")
const log = console.log
const VersionControl = new VCFunc()
const init = require("./lib/init")
const server = require("./lib/server")

clear()

log(chalk.yellow(figlet.textSync("Monorepo", { horizontalLayout: "full" })))
log(
  chalk.black.bgYellow("Please ensure that you are inside an empty directory!")
)

const start = async function () {
  // initialize project
  let initialAnswers = await init.run()
  console.log("init: ", initialAnswers)
  // setting up the server
  let serverAnswers = await server.run()
  // version control

  // const github = require("./lib/github/github")
  // const VC = await VersionControl.run()
  // let git, bit
  // if (VC.version === "Github") {
  //   git = (await github()).run()
  // } else {
  //   bit = (await bitbucket()).run()
  // }
}

start()
