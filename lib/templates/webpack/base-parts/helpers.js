const { base } = require("../base")
const merge = require("lodash/merge")

exports.glueWebpackParts = function (imports, config, addendum) {
  let ob = base()
  const mergedImports = ob.imports.concat(imports, ["\r\r"]).join("")
  const mergedConfigsObject = merge(ob.config, config)
  const ConfigsToString = JSON.stringify(mergedConfigsObject, null, 2).concat(
    "\r\r"
  )
  const mergedAddendums = ob.addendum.concat(addendum, ["\r"]).join("")
  const mergedAll = mergedImports.concat(
    ConfigsToString.concat(mergedAddendums)
  )
  return mergedAll
}
