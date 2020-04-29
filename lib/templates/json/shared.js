module.exports = {
  scripts: {
    build: "rimraf dist && tsc",
  },
  dependencies: {
    react: "^16.13.1",
  },
  devDependencies: {
    "@babel/cli": "^7.1.0",
    "@babel/core": "^7.1.0",
    "@babel/preset-env": "^7.1.0",
    "@babel/preset-react": "^7.9.4",
    "@types/react": "^16.9.34",
    rimraf: "^3.0.2",
    typescript: "^3.8.3",
  },
}
