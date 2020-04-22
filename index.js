#!/usr/bin/env node

const chalk = require("chalk")
const clear = require("clear")
const figlet = require("figlet")

const VCFunc = require("./lib/utilities/version-control")
const files = require("./lib/utilities/files")
const repo = require("./lib/github/repo")
const fs = require("fs")
const log = console.log
const VersionControl = new VCFunc()
const init = require("./lib/init")

clear()

log(chalk.yellow(figlet.textSync("Monorepo", { horizontalLayout: "full" })))
log(
  chalk.black.bgYellow("Please ensure that you are inside an empty directory!")
)

const start = async function () {
  // initialize project
  let done = await init.run()
  const github = require("./lib/github/github")
  // version control
  const VC = await VersionControl.run()
  let git, bit
  if (VC.version === "Github") {
    git = (await github()).run()
  } else {
    bit = (await bitbucket()).run()
  }
  // lerna
  let ver = await git
  if (ver === "git") {
    lerna.setupLerna()
  } else {
    console.log("implement bit strategy")
  }
}

start().catch((err) => log(chalk.red(err)))
