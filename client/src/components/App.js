import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./Common/Navbar";
import InterCreateProfile from "./Pages/InternCreateProfile";

import "antd/lib/icon/style/index.css";
import "antd/lib/button/style/index.css";
import "antd/lib/collapse/style/index.css";
import "antd/lib/table/style/index.css";
import "antd/lib/input/style/index.css";
import "antd/lib/avatar/style/index.css";
import "antd/lib/grid/style/index.css";
import "antd/lib/checkbox/style/index.css";
import "antd/lib/date-picker/style/index.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route path="/intern-create-profile" component={InterCreateProfile} />
        </div>
      </Router>
    );
  }
}

export default App;
