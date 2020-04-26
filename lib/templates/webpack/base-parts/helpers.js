const { base } = require("../base")
const merge = require("lodash/merge")

exports.glueWebpackParts = function (imports, config, addendum) {
  let ob = base()
  const mergedImports = ob.imports.concat(imports, ["\r\r"]).join("")
  const mergedConfigsObject = merge(ob.config, config)
  const ConfigsToString = "const config=".concat(
    JSON.stringify(mergedConfigsObject, null, 2).concat("\r\r")
  )

  // add new keyword to plugins
  let Configs = ConfigsToString.replace(
    "MiniCssExtractPlugin",
    "new MiniCssExtractPlugin"
  )
  Configs = ConfigsToString.replace(
    "HtmlWebpackPlugin",
    "new HtmlWebpackPlugin"
  )
  Configs = ConfigsToString.replace(
    "BundleAnalyzerPlugin",
    "new BundleAnalyzerPlugin"
  )

  const mergedAddendums = ob.addendum.concat(addendum, ["\r"]).join("")
  const mergedAll = mergedImports.concat(Configs.concat(mergedAddendums))
  return mergedAll
}
