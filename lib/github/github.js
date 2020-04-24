const CLI = require("clui")
const chalk = require("chalk")
const { Octokit } = require("@octokit/rest")
const Spinner = CLI.Spinner
const repo = require("./repo")
const { createBasicAuth } = require("@octokit/auth-basic")

const inquirer = require("../utilities/inquirer")
const pkg = require("../../package.json")

const config = require("../../config")

let octokit

module.exports = async function () {
  return {
    getInstance: function () {
      return octokit
    },

    getGithubToken: async function () {
      // Fetch token from config store
      let token = this.getStoredGithubToken()
      if (token) {
        return token
      }

      // No token found, use credentials to access GitHub account
      token = await this.getPersonalAccesToken()

      return token
    },

    getStoredGithubToken: function () {
      return config.store.get("github.token")
    },

    githubAuth: (token) => {
      octokit = new Octokit({
        auth: token,
      })
    },

    getPersonalAccesToken: async () => {
      const credentials = await inquirer.askGithubCredentials()
      const status = new Spinner("Authenticating you, please wait...")

      status.start()

      const auth = createBasicAuth({
        username: credentials.username,
        password: credentials.password,
        async on2Fa() {
          status.stop()
          const res = await inquirer.getTwoFactorAuthenticationCode()
          status.start()
          return res.twoFactorAuthenticationCode
        },
        token: {
          scopes: ["user", "public_repo", "repo", "repo:status"],
          note: "repo, the command-line tool for scaffolding monorepos",
        },
      })

      try {
        const res = await auth()

        if (res.token) {
          conf.set("github.token", res.token)
          return res.token
        } else {
          throw new Error("GitHub token was not found in the response")
        }
      } finally {
        status.stop()
      }
    },
    run: async function () {
      try {
        // Retrieve & Set Authentication Token
        const token = await this.getGithubToken()
        this.githubAuth(token)

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
      return "git"
    },
  }
}
