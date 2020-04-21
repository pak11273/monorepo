#!/usr/bin/env node

const chalk = require("chalk")
const clear = require("clear")
const figlet = require("figlet")

const files = require("./lib/files")
const github = require("./lib/github")
const repo = require("./lib/repo")
const fs = require("fs")
const log = console.log

clear()

log(chalk.yellow(figlet.textSync("Monorepo", { horizontalLayout: "full" })))
log(chalk.bgYellow("Please ensure that you are inside an empty directory!"))

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

const getGithubToken = async () => {
  // Fetch token from config store
  let token = github.getStoredGithubToken()
  if (token) {
    return token
  }

  // No token found, use credentials to access GitHub account
  token = await github.getPersonalAccesToken()

  return token
}

const run = async () => {
  try {
    // Retrieve & Set Authentication Token
    const token = await getGithubToken()
    github.githubAuth(token)

    // Create remote repository
    const url = await repo.createRemoteRepo()

    // Create .gitignore file
    await repo.createGitignore()

    // Set up local repository and push to remote
    await repo.setupRepo(url)

    console.log(chalk.green("Processing..."))
  } catch (err) {
    if (err) {
      switch (err.status) {
        case 401:
          console.log(
            chalk.red(
              "Couldn't log you in. Please provide correct credentials/token."
            )
          )
          break
        case 422:
          console.log(
            chalk.red(
              "There is already a remote repository or token with the same name"
            )
          )
          break
        default:
          console.log(chalk.red(err))
      }
    }
  }
}

isDirEmpty(".").then((val) => {
  if (!val) {
    log(
      chalk.red(
        "There are files inside this directory! Delete all files or create a new directory."
      )
    )
    process.exit()
  } else {
    run()
  }
})
