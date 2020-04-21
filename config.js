const Configstore = require("configstore")
const pkg = require("./package.json")

const store = new Configstore(pkg.name)

module.exports = {
  store: store,
}
