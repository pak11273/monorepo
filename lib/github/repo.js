const CLI = require("clui")
const fs = require("fs")
const util = require("util")
const writeFile = util.promisify(fs.writeFile)
const git = require("simple-git/promise")()
const Spinner = CLI.Spinner
const _ = require("lodash")
const gitIgnore = require("../../lib/templates/gitignore")

const inquirer = require("../utilities/inquirer")

module.exports = {
  createRemoteRepo: async function () {
    const gh = await require("./github")
    const github = (await gh()).getInstance()
    const answers = await inquirer.askRepoDetails()

    const data = {
      name: answers.name,
      description: answers.description,
      private: answers.visibility === "private",
    }

    const status = new Spinner("Creating remote repository...")
    status.start()

    try {
      const response = await github.repos.createForAuthenticatedUser(data)
      return response.data.ssh_url
    } finally {
      status.stop()
    }
  },

  // createGitignore: async () => {
  //   writeFile(".gitignore", "")
  //   const filelist = _.without(fs.readdirSync("."), ".git", ".gitignore")

  //   if (filelist.length) {
  //     const answers = await inquirer.askIgnoreFiles(filelist)
  //     if (!answers) {
  //       return
  //     }

  //     if (answers.ignore.length) {
  //       fs.appendFile(".gitignore", await gitIgnore.gitignoreMerge(), () => {
  //         fs.appendFile(".gitignore", answers.ignore.join("\n"), () => null)
  //       })
  //     }
  //   }
  // },

  setupRepo: async (url) => {
    const status = new Spinner(
      "Initializing local repository and pushing to remote..."
    )
    status.start()

    try {
      git
        .init()
        .then(git.add(".gitignore"))
        .then(git.add("./*"))
        .then(git.commit("Initial commit"))
        .then(git.addRemote("origin", url))
        .then(git.push("origin", "master"))
    } finally {
      status.stop()
    }
  },
}
