import React, { Component } from "react";
import { Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import HostProfile from "./HostProfile";

import { HOME_URL, HOST_PROFILE } from "./../../constants/navRoutes";

class Pages extends Component {
  render() {
    return (
      <>
        <Route exact path={HOME_URL} component={LandingPage} />
        <Route path={HOST_PROFILE} component={HostProfile} />
      </>
    );
  }
}

export default Pages;
