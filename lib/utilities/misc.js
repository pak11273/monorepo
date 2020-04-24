const fs = require("fs")
const util = require("util")
const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)

function isDirEmpty(dir) {
  return fs.promises.readdir(dir).then((files) => {
    return files.length === 0
  })
}

async function transferContents(srcPath, savPath) {
  async function copyData(savPath, srcPath) {
    const data = await readFile(srcPath, "utf8")
    await writeFile(savPath, data)
  }
  await copyData(savPath, srcPath)
}

module.exports = {
  isDirEmpty,
  transferContents,
}
