import "./App.css"

import React, { Component } from "react"

import { hot } from "react-hot-loader/root"

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Hello, World! </h1>
      </div>
    )
  }
}

export default hot(App)
