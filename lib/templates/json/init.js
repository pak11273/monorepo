const npmMerge = async (params) => {
  // merge params to config object
  const config = {
    name: params.projectName || "project",
    private: true,
    workspaces: ["packages/*"],
    scripts: {
      bootstrap: "lerna bootstrap --use-workspaces",
    },
    devDependencies: {
      lerna: "^3.20.2",
    },
  }

  return config
}

module.exports = {
  npmMerge,
}
