#!/usr/bin/env node

const chalk = require("chalk")
const clear = require("clear")
const figlet = require("figlet")

const VCFunc = require("./lib/utilities/version-control")
const log = console.log
const VersionControl = new VCFunc()
const init = require("./lib/init")
const serverlib = require("./lib/server")
const clientlib = require("./lib/client")
const bundlerlib = require("./lib/bundler")
const adminlib = require("./lib/admin")
const dblib = require("./lib/database")
const mobilelib = require("./lib/mobile")
const sharedlib = require("./lib/shared")
// const typescriptlib = require("./lib/typescript")
const weblib = require("./lib/web")

clear()

log(chalk.yellow(figlet.textSync("Monorepo", { horizontalLayout: "full" })))

const start = async function () {
  // initialize project
  let initialAnswers = await init.run()
  const { server, client, admin, web, db } = initialAnswers

  // setting up the server
  if (server === "yes") {
    var serverAnswers = await serverlib.run(initialAnswers)
  }

  // setting up the client
  if (client === "yes") {
    var clientAnswers = await clientlib.run(initialAnswers)
  }

  // setting up the bundler
  if (clientAnswers) {
    let bundlerAnswers = await bundlerlib.run(initialAnswers)
  }

  // setting up the shared
  let sharedAnswers = await sharedlib.run(initialAnswers)

  // setting up the admin
  if (admin === "yes") {
    let adminAnswers = await adminlib.run(initialAnswers)
  }

  // setting up the website
  if (web === "yes") {
    let webAnswers = await weblib.run(initialAnswers)
  }

  // setting up the mobile
  if (web === "yes") {
    let mobileAnswers = await mobilelib.run(initialAnswers)
  }

  // setting up the db
  if (db === "yes") {
    let dbAnswers = await dblib.run(initialAnswers)
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
