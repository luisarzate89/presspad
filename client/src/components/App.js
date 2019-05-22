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

export const initialState = {
  isLoggedIn: false,
  userId: null,
  userName: null,
  userEmail: null,
  isMounted: false
};

class App extends Component {
  state = {
    ...initialState
  };

  handleChangeState = data => {
    this.setState({ ...data, isMounted: true });
  };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Pages
              handleChangeState={this.handleChangeState}
              isLoggedIn={isLoggedIn}
              {...this.state}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
