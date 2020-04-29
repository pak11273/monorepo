const inquirer = require("../utilities/inquirer")

async function setupBundler(answers) {
  let BundlerClass = require(`./${answers.bundler}.js`)
  let Bundler = new BundlerClass(answers)
  switch (answers.bundler) {
    case "webpack":
      await Bundler.serveWebpack(answers)
      break
    case "parcel":
      await Bundler.serveParcel()
      break
    case "rollup":
      await Bundler.serveRollup()
      break
    default:
      await Bundler.serveWebpack(answers)
      break
  }
  return answers
}

module.exports = {
  run: async (prev) => {
    const answers = await inquirer.chooseBundler(prev)
    await setupBundler(answers)
    return answers
  },
}
