#!/usr/bin/env node

const chalk = require("chalk")
const clear = require("clear")
const figlet = require("figlet")

const files = require("./lib/files")
const repo = require("./lib/repo")
const fs = require("fs")
const log = console.log

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

// GIT REPO

if (files.directoryExists(".git")) {
  console.log(
    chalk.red(
      "A Git repository already exists! Please rm -rf .git and start over"
    )
  )
  process.exit()
}

isDirEmpty(".").then(async (val) => {
  const github = require("./lib/github")
  if (!val) {
    log(
      chalk.red(
        "There are files inside this directory! Delete all files or create a new directory."
      )
    )
    process.exit()
  } else {
    ;(await github()).run()
  }
})
