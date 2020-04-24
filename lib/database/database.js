const Database = function ({ typescript, orm, db }) {
  this.typescript = typescript
  this.orm = orm
  this.db = db
}

Database.prototype.setup = function () {
  console.log("setup server")
}

module.exports = Database
