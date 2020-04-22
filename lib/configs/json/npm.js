const npmMerge = async (params) => {
  // merge params to config object
  const config = {
    name: params.lerna || "root",
    private: true,
    workspaces: ["packages/*"],
    devDependencies: {
      lerna: "^3.5.1",
    },
  }

  return config
}

module.exports = {
  npmMerge,
}
