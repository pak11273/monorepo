import "./assets/scss/app.scss"

import React, { Component } from "react"

import { hot } from "react-hot-loader"

// import { hot } from "react-hot-loader/root"

const App = () => (
  <div className="app">
    <h1> hello, World! </h1>
  </div>
)

export default hot(module)(App)
