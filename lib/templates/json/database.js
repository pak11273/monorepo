const databaseMerge = async (params) => {
  // merge params to config object
  const config = {
    name: "database",
    version: "1.0.0",
    main: "dist/index.js",
    module: "src/index.js",
    dependencies: {},
  }

  return config
}

module.exports = {
  databaseMerge,
}
