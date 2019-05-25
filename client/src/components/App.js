import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

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
import "antd/lib/modal/style/index.css";
import "antd/lib/spin/style/index.css";
import "antd/lib/alert/style/index.css";

import { API_USER_URL } from "./../constants/apiRoutes";

import Navbar from "./Common/Navbar";

import Pages from "./Pages";

export const initialState = {
  isLoggedIn: false,
  id: null,
  name: null,
  email: null,
  isMounted: false,
  role: null
};

class App extends Component {
  state = {
    ...initialState
  };

  handleChangeState = data => {
    this.setState({ ...data, isMounted: true });
  };

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    axios
      .get(API_USER_URL)
      .then(({ data }) => {
        if (data.user) {
          this.setState({ ...data.user, isLoggedIn: true, isMounted: true });
        } else {
          this.setState({ ...initialState, isMounted: true });
        }
      })
      .catch(err => this.setState({ error: err.responses, isMounted: true }));
  };

  render() {
    const { isLoggedIn, role } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar isLoggedIn={isLoggedIn} userType={role} />
          <Pages
            handleChangeState={this.handleChangeState}
            isLoggedIn={isLoggedIn}
            {...this.state}
          />
        </div>
      </Router>
    );
  }
}

export default App;
