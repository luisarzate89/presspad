import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

// Antd style
import "antd/lib/layout/style/index.css";
import "antd/lib/input/style/index.css";
import "antd/lib/button/style/index.css";
import "antd/lib/menu/style/index.css";
import "antd/lib/carousel/style/index.css";
import "antd/lib/breadcrumb/style/index.css";

import Navbar from "./Common/Navbar";

import Pages from "./Pages";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Pages />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
