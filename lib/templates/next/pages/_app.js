import App from "next/app"
import React from "react"
import { ThemeProvider } from "styled-components"

// TODO: in the root directory, type this command: lerna add @<project name>/shared
// Then uncomment below and remove the current theme object
// import { theme } from "@<project name>/shared"

const theme = {
  colors: {
    primary: "red",
  },
}

// This default export is required in a new `pages/_app.js` file.
export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
