import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Antd style
import "antd/lib/layout/style/index.css";
import "antd/lib/input/style/index.css";
import "antd/lib/button/style/index.css";
import "antd/lib/menu/style/index.css";
import "antd/lib/breadcrumb/style/index.css";

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
