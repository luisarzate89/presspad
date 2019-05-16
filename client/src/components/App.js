import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

// Antd style
import "antd/lib/layout/style/index.css";
import "antd/lib/input/style/index.css";
import "antd/lib/button/style/index.css";
import "antd/lib/menu/style/index.css";
import "antd/lib/breadcrumb/style/index.css";

import Header from "./Common/Header";
import Footer from "./Common/Footer";

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Header isLoggedin />
          <Switch>
            <div
              className="App"
              // to be removed when content commes in
              style={{ paddingTop: "60px", height: "1000px" }}
            >
              App
            </div>
          </Switch>
          <Footer />
        </>
      </Router>
    );
  }
}

export default App;
