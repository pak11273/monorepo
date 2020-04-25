const webpackMerge = async (params) => {
  // merge params to config object
  const config = {
    name: "client",
    version: "1.0.0",
    main: "dist/index.js",
    module: "src/index.js",
    scripts: {
      start: "webpack-dev-server --mode-development",
    },
    dependencies: {
      "@hot-loader/react-dom": "^16.13.0",
      react: "16.13.1",
      "react-dom": "16.13.1",
      "react-hot-loader": "^4.12.20",
    },
    devDependencies: {
      "@babel/core": "^7.1.0",
      "@babel/cli": "^7.1.0",
      "@babel/preset-env": "^7.1.0",
      "@babel/preset-react": "^7.0.0",
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

  return config
}

module.exports = {
  webpackMerge,
}
