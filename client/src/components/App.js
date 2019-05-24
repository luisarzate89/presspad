import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Navbar from "./Common/Navbar";

// Antd style
import "antd/lib/layout/style/index.css";
import "antd/lib/input/style/index.css";
import "antd/lib/button/style/index.css";
import "antd/lib/menu/style/index.css";
import "antd/lib/carousel/style/index.css";
import "antd/lib/breadcrumb/style/index.css";
import "antd/lib/icon/style/index.css";
import "antd/lib/collapse/style/index.css";
import "antd/lib/table/style/index.css";
import "antd/lib/avatar/style/index.css";
import "antd/lib/grid/style/index.css";
import "antd/lib/checkbox/style/index.css";
import "antd/lib/date-picker/style/index.css";
import "antd/lib/divider/style/index.css";
import "antd/lib/message/style/index.css";

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
