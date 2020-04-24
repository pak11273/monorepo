#!/usr/bin/env node

const chalk = require("chalk")
const clear = require("clear")
const figlet = require("figlet")

const VCFunc = require("./lib/utilities/version-control")
const log = console.log
const VersionControl = new VCFunc()
const init = require("./lib/init")
const server = require("./lib/server")
const client = require("./lib/client")
const db = require("./lib/database")

clear()

log(chalk.yellow(figlet.textSync("Monorepo", { horizontalLayout: "full" })))
log(
  chalk.black.bgYellow("Please ensure that you are inside an empty directory!")
)

const start = async function () {
  // initialize project
  let initialAnswers = await init.run()
  // setting up the server
  if (initialAnswers.server === "yes") {
    var serverAnswers = await server.run(initialAnswers)
  }
  // setting up the client
  if (initialAnswers.client === "yes") {
    let clientAnswers = await client.run(initialAnswers)
  }
  // setting up the db
  if (initialAnswers.db === "yes") {
    let dbAnswers = await db.run(initialAnswers)
  }

  // version control
  const github = require("./lib/github/github")
  const VC = await VersionControl.run()
  let git, bit
  if (VC.version === "Github") {
    git = (await github()).run()
  } else {
    bit = (await bitbucket()).run()
  }
}

start()
