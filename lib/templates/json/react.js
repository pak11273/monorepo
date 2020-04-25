const reactMerge = async (params) => {
  // merge params to config object
  const config = {
    name: "client",
    version: "1.0.0",
    main: "dist/index.js",
    module: "src/index.js",
    dependencies: {
      react: "16.13.1",
      "react-dom": "16.13.1",
    },
    devDependencies: {
      "@babel/core": "^7.1.0",
      "@babel/cli": "^7.1.0",
      "@babel/preset-env": "^7.1.0",
      "@babel/preset-react": "^7.0.0",
    },
  }

  return config
}

module.exports = {
  reactMerge,
}
