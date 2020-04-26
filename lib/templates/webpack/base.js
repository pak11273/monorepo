const path = require("path")
const fs = require("fs")
const config = require("./base-parts/config")

exports.base = function () {
  var imports = fs
    .readFileSync(path.join(__dirname, "./base-parts/imports.txt"), "utf8")
    .split("\n")
  var addendum = fs
    .readFileSync(path.join(__dirname, "./base-parts/addendum.txt"), "utf8")
    .split("\n")

  return {
    imports,
    config,
    addendum,
  }
}
