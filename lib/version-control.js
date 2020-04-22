const inquirer = require("./inquirer")

module.exports = function VersionControl() {
  this.chooseVersionControl = function () {
    console.log("HELLO")
  }
  this.run = async function () {
    return await inquirer.askVersionControl()
  }
}
