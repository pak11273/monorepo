const baseJsonMerge = async (params) => {
  // merge params to config object
  const config = {
    name: `${params.name}`,
    version: "1.0.0",
    main: "dist/index.js",
    module: "src/index.js",
    private: true,
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
  baseJsonMerge,
}
