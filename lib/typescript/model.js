const TypescriptClass = function ({ typescript }) {
  this.typescript = typescript
}

TypescriptClass.prototype.setup = function () {
  console.log("setup typescript")
}

module.exports = TypescriptClass
