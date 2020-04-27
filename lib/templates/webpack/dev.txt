const path = require("path")
const webpack = require("webpack")
const CircularDependencyPlugin = require("circular-dependency-plugin")

module.exports = require("./webpack.base.babel")({
  // module.exports = {
  mode: "development",

  entry: ["react-hot-loader/patch", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  // WARNING: This property causes webpack dev server to fail DO NOT uncomment
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //   },
  // },
  // options for various rules
  babelQuery: { presets: ["@babel/env"] },
  stats: {
    warnings: false, // terminal warnings
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
  ],
  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  // WARNING: devtool causes webpack dev server to stop working, DO NOT uncomment
  // devtool: "eval-source-map",
  target: "web",
  performance: {
    hints: false,
  },
})
