import React, { Component } from "react";
import { Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import InterCreateProfile from "./InternCreateProfile";

import { HOME_URL, COMPLETE_PROFILE_URL } from "./../../constants/navRoutes";

class Pages extends Component {
  render() {
    return (
      <>
        <Route path={HOME_URL} component={LandingPage} exact />
        <Route
          path={COMPLETE_PROFILE_URL}
          component={InterCreateProfile}
          exact
        />
      </>
    );
  }
}

export default Pages;
