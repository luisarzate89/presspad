import React, { Component } from "react";
import { Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import HostCreateProfile from "./HostCreateProfile";

import { HOME_URL, COMPLETE_PROFILE_URL } from "./../../constants/navRoutes";

class Pages extends Component {
  render() {
    return (
      <>
        <Route path={HOME_URL} component={LandingPage} exact />
        <Route
          path={COMPLETE_PROFILE_URL}
          component={HostCreateProfile}
          exact
        />
      </>
    );
  }
}

export default Pages;
