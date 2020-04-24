const sharedMerge = async () => {
  // merge params to config object
  const config = {
    name: "shared",
    private: true,
  }

  return config
}

module.exports = {
  sharedMerge,
}
