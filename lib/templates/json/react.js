const reactMerge = async (params) => {
  // merge params to config object
  const config = {
    name: "client",
    version: "1.0.0",
    main: "dist/index.js",
    module: "src/index.js",
    dependencies: {
      react: "16.8.5",
      "react-dom": "16.8.5",
    },
  }

  return config
}

module.exports = {
  reactMerge,
}
