import React, { Component } from "react";
import { Route } from "react-router-dom";

import LandingPage from "./LandingPage";

import { HOME_URL } from "./../../constants/navRoutes";

class Pages extends Component {
  render() {
    return (
      <>
        <Route path={HOME_URL} component={LandingPage} />
      </>
    );
  }
}

export default Pages;
