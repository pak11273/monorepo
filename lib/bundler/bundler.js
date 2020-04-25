const Bundler = function ({ bundler }) {
  this.bundler = bundler
}

Bundler.prototype.setup = function () {
  console.log("setup bundler")
}

module.exports = Bundler
