const Mobile = function ({ mobile }) {
  this.mobile = mobile
}

Mobile.prototype.setup = function () {
  console.log("setup mobile")
}

module.exports = Mobile
