const fs = require("fs")
const util = require("util")
const { exec } = require("child_process")
const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)
const execProm = util.promisify(exec)
const appendFile = util.promisify(fs.appendFile)
const baseJson = require("../templates/json/base")
const mkDir = util.promisify(fs.mkdir)
const path = require("path")
const { promisify } = require("util")

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

/*
 * @param {dir path} sourceDir - source dir to transfer
 * ie. path.join(__dirname, "./templates/shared/index.js")
 * @param {string} destDir - a path string to the directory
 * ie."./packages/shared/index.js"
 *
 * NOTE: A destDir must exist, files will merge into another dir
 * Existing filenames with same name will be overwritten.
 */

async function transferDirFiles(sourceDir, destDir, ext) {
  const pathnames = promisify(fs.readdir)(sourceDir)
  let filenames = await pathnames
  var ob = {}
  const data = filenames.map(async (filename, i) => {
    if (filename.includes(".")) {
      var storedFile = promisify(fs.readFile)(sourceDir + `\\${filename}`, {
        encoding: "utf8",
      })
      let fileContents = await storedFile
      filename = filename.replace(/\.(js|ts)/, "")
      fs.writeFile(
        `${destDir}\\${filename}${ext ? `.${ext}` : ".js"}`,
        fileContents,
        () => null
      )
    }
  })
}

module.exports = {
  appendFile,
  baseJsonRename,
  execProm,
  isDirEmpty,
  mkDir,
  transferContents,
  transferDirFiles,
  readFile,
  writeFile,
}
