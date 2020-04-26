const ClientClass = function ({ client, typescript }) {
  this.client = client
  this.typescript = typescript
}

ClientClass.prototype.setup = function () {
  console.log("setup client")
}

module.exports = ClientClass
