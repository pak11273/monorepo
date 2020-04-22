const inquirer = require("./inquirer")

module.exports = function VersionControl() {
  this.run = async function () {
    return await inquirer.askVersionControl()
  }
}
