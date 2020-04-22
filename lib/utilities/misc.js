const fs = require("fs")
const util = require("util")
const exec = util.promisify(require("child_process").exec)

function isDirEmpty(dir) {
  return fs.promises.readdir(dir).then((files) => {
    return files.length === 0
  })
}

module.exports = {
  isDirEmpty,
}
