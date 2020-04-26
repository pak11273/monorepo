const lernaMerge = async () => {
  // merge params to config object
  const config = {
    packages: ["packages/*"],
    npmClient: "yarn",
    useWorkspaces: true,
    version: "independent",
  }

  return config
}

module.exports = {
  lernaMerge,
}
