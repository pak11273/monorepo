const Web = function ({ web }) {
  this.Web = web
}

Web.prototype.setup = function () {
  console.log("setup web")
}

module.exports = Web
