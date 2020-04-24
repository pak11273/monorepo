const sharedMerge = async () => {
  // merge params to config object
  const config = {
    name: "shared",
    private: true,
    workspaces: ["packages/*"],
  }

  return config
}

module.exports = {
  sharedMerge,
}
