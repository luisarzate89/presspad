import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

//  COMMON COMPONENTS
import PrivateRoute from "./../Common/PrivateRoute";

import LandingPage from "./LandingPage";
import HostCreateProfile from "./HostCreateProfile";

import SignInPage from "./SignInPage";
import Dashboard from "./Dashboard";
import HostProfile from "./HostProfile";

import {
  HOME_URL,
  SIGNIN_URL,
  DASHBOARD_URL,
  HOST_PROFILE,
  COMPLETE_PROFILE_URL
} from "./../../constants/navRoutes";

class Pages extends Component {
  render() {
    const { handleChangeState, isLoggedIn } = this.props;
    return (
      <>
        <Switch>
          <Route path={HOME_URL} exact component={LandingPage} />
          <Route path={HOST_PROFILE} component={HostProfile} />

          <PrivateRoute
            exact
            path={DASHBOARD_URL}
            Component={Dashboard}
            handleChangeState={handleChangeState}
            isLoggedIn={isLoggedIn}
            {...this.props}
          />

          <PrivateRoute
            exact
            path={COMPLETE_PROFILE_URL}
            Component={HostCreateProfile}
            handleChangeState={handleChangeState}
            isLoggedIn={isLoggedIn}
            {...this.props}
          />

          <Route
            path={SIGNIN_URL}
            exact
            render={linkProps =>
              !isLoggedIn ? (
                <SignInPage
                  handleChangeState={handleChangeState}
                  {...linkProps}
                />
              ) : (
                <Redirect to={DASHBOARD_URL} />
              )
            }
          />
        </Switch>
      </>
    );
  }
}

export default Pages;
