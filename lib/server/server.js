const ServerClass = function ({ framework, typescript, orm, db }) {
  this.framework = framework
  this.typescript = typescript
  this.orm = orm
  this.db = db
}

ServerClass.prototype.setup = function () {
  console.log("setup server")
}

module.exports = ServerClass
