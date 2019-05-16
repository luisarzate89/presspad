import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Antd style
import "antd/lib/layout/style/index.css";
import "antd/lib/menu/style/index.css";
import "antd/lib/breadcrumb/style/index.css";

import Header from "./Common/Header";
class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Header isLoggedin />
          <Switch>
            <div className="App">App</div>
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
