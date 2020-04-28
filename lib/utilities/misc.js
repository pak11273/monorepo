const fs = require("fs")
const util = require("util")
const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)
const appendFile = util.promisify(fs.appendFile)
const baseJson = require("../templates/json/base")

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

/*
 * @param {string} newPathName - path and filename of the new file
 * ie."./packages/shared/package.json"
 * @param {string} newPathName - new name of the package
 * ie. `@${answers.projectName}/admin`
 */
async function baseJsonRename(newPathName, newName) {
  let done = await appendFile(
    newPathName,
    JSON.stringify(
      await baseJson.baseJsonMerge({
        name: newName,
      }),
      null,
      2
    )
  )
  return done
}

module.exports = {
  appendFile,
  baseJsonRename,
  isDirEmpty,
  transferContents,
  readFile,
  writeFile,
}
