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
const bundler = require("./lib/bundler")
const admin = require("./lib/admin")
const db = require("./lib/database")
const mobile = require("./lib/mobile")
const web = require("./lib/web")

clear()

log(chalk.yellow(figlet.textSync("Monorepo", { horizontalLayout: "full" })))

const start = async function () {
  // initialize project
  let initialAnswers = await init.run()
  // setting up the server
  if (initialAnswers.server === "yes") {
    var serverAnswers = await server.run(initialAnswers)
  }
  // setting up the client
  if (initialAnswers.client === "yes") {
    var clientAnswers = await client.run(initialAnswers)
  }
  // setting up the bundler
  if (clientAnswers.client === "react") {
    let bundlerAnswers = await bundler.run(initialAnswers)
  }
  // setting up the admin
  if (initialAnswers.admin === "yes") {
    let adminAnswers = await admin.run(initialAnswers)
  }
  // setting up the website
  if (initialAnswers.web === "yes") {
    let webAnswers = await web.run(initialAnswers)
  }
  // setting up the mobile
  if (initialAnswers.web === "yes") {
    let mobileAnswers = await mobile.run(initialAnswers)
  }
  // setting up the db
  if (initialAnswers.db === "yes") {
    let dbAnswers = await db.run(initialAnswers)
  }
  // setting up the db
  if (initialAnswers.typescript === "yes") {
    let typescriptAnswers = await db.run(initialAnswers)
  }

  // version control
  const github = require("./lib/github/github")
  const VC = await VersionControl.run()
  let git, bit
  if (VC.version === "Github") {
    git = (await github()).run()
  } else {
    // bit = (await bitbucket()).run()
  }
}

start()
