import "../src/assets/css/styles.css"

import App from "next/app"
import React from "react"
import { ThemeProvider } from "styled-components"
import { theme } from "@swim/shared"

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
