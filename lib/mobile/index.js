const inquirer = require("../utilities/inquirer")

async function setupMobile(answers) {
  let MobileClass = require(`./${answers.mobile}.js`)
  let Mobile = new MobileClass(answers)
  switch (answers.mobile) {
    case "react-native":
      await Mobile.serveReactNative(answers)
      break
    case "react-native-app":
      await Mobile.serveReactNativeApp(answers)
      break
    case "ios":
      await Mobile.serveIOS(answers)
      break
    case "android":
      await Mobile.serveAndroid(answers)
      break
    default:
      await Mobile.serveReactNative(answers)
      break
  }
  return answers
}

module.exports = {
  run: async (prev) => {
    const answers = await inquirer.chooseMobile(prev)
    const merged = { ...prev, ...answers }
    await setupMobile(merged)
    return answers
  },
}
