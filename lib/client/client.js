const Client = function ({ client }) {
  this.client = client
}

Client.prototype.setup = function () {
  console.log("setup client")
}

module.exports = Client
