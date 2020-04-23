const Server = function ({ framework, typescript, orm, db }) {
  this.framework = framework
  this.typescript = typescript
  this.orm = orm
  this.db = db
}

Server.prototype.setup = function () {
  console.log("setup server")
}

module.exports = Server
