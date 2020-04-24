const sharedMerge = async () => {
  // merge params to config object
  const config = {
    name: "shared",
    version: "1.0.0",
    main: "dist/index.js",
    module: "src/index.js",
    private: true,
  }

  return config
}

module.exports = {
  sharedMerge,
}
