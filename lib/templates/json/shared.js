const sharedMerge = async (params) => {
  // merge params to config object
  const config = {
    name: `${params.name}`,
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
