const CLI = require("clui")
const Spinner = CLI.Spinner

module.exports = {
  setupLerna: async (url) => {
    const status = new Spinner(
      "Initializing npm and adding Lerna to the project..."
    )
    status.start()

    try {
      // pending
      console.log("step lerna")
    } finally {
      status.stop()
    }
  },
}
