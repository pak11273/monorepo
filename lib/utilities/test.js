const { glueWebpackParts } = require("../templates/webpack/base-parts/helpers")

let foo = async function () {
  try {
    let boo = await glueWebpackParts(["this is a test"])
    console.log(boo)
  } catch (err) {
    console.log(err)
  }
}

foo()
