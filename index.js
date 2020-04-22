#!/usr/bin/env node

const chalk = require("chalk")
const clear = require("clear")
const figlet = require("figlet")

const VCFunc = require("./lib/version-control")
const files = require("./lib/files")
const repo = require("./lib/repo")
const fs = require("fs")
const log = console.log
const VersionControl = new VCFunc()

clear()

log(chalk.yellow(figlet.textSync("Monorepo", { horizontalLayout: "full" })))
log(
  chalk.black.bgYellow("Please ensure that you are inside an empty directory!")
)

// Check if this is a new directory
function isDirEmpty(dirname) {
  return fs.promises.readdir(dirname).then((files) => {
    return files.length === 0
  })
}

// Version control
if (files.directoryExists(".git")) {
  console.log(
    chalk.red(
      "A Git repository already exists! Please rm -rf .git and start over"
    )
  )
  process.exit()
}

const start = async function () {
  const github = require("./lib/github")
  const empty = await isDirEmpty(".")
  if (!empty) {
    log(
      chalk.red(
        "There are files inside this directory! Delete all files or create a new directory."
      )
    )
    process.exit()
  } else {
    const VC = await VersionControl.run()
    let git, bit
    if (VC.version === "Github") {
      git = (await github()).run()
    } else {
      bit = (await bitbucket()).run()
    }
    // Add lerna
  }
}

start().catch((err) => log(chalk.red(err)))
