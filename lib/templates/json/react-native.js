const reactNativeMerge = async (params) => {
  // merge params to config object
  const config = {
    name: "mobile",
    version: "1.0.0",
    main: "dist/index.js",
    module: "src/index.js",
    dependencies: {
      "react-native": "0.62.2",
    },
  }

  return config
}

module.exports = {
  reactNativeMerge,
}
