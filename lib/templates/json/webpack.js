module.exports = {
  scripts: {
    start:
      "cross-env NODE_ENV=development webpack-dev-server --config ./webpack.dev.babel.js --color -p --progress --hide-modules",
    build:
      "cross-env NODE_ENV=production webpack --config ./webpack.prod.babel.js --color -p --progress --hide-modules --display-optimization-bailout",
  },
  devDependencies: {
    webpack: "^4.43.0",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.10.3",
    "style-loader": "^1.2.0",
    "css-loader": "^3.5.3",
    "sass-loader": "^8.0.2",
    "babel-loader": "^8.1.0",
    "node-sass": "^4.14.0",
  },
}
