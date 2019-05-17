import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./Common/Navbar";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          App
        </div>
      </Router>
    );
  }
}

export default App;
