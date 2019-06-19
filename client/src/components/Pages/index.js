import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

//  COMMON COMPONENTS
import PrivateRoute from "./../Common/PrivateRoute";

import LandingPage from "./LandingPage";
import HostCreateProfile from "./HostCreateProfile";

import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Dashboard from "./Dashboard";
import HostProfile from "./HostProfile";
import SearchHosts from "./SearchHosts";

import {
  HOME_URL,
  SIGNIN_URL,
  SIGNUP_INTERN,
  SIGNUP_HOST,
  SIGNUP_ORG,
  DASHBOARD_URL,
  HOST_PROFILE,
  COMPLETE_PROFILE_URL,
  HOSTS_URL
} from "./../../constants/navRoutes";

class Pages extends Component {
  render() {
    const { handleChangeState, isLoggedIn } = this.props;
    return (
      <>
        <Switch>
          <Route path={HOME_URL} exact component={LandingPage} />

          <PrivateRoute
            path={HOST_PROFILE}
            Component={HostProfile}
            handleChangeState={handleChangeState}
            isLoggedIn={isLoggedIn}
            {...this.props}
          />
          <Route path={HOST_PROFILE} component={HostProfile} />
          <Route
            exact
            path={HOSTS_URL}
            render={() => <SearchHosts isLoggedIn={isLoggedIn} />}
          />

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
            path={SIGNUP_INTERN}
            exact
            render={linkProps =>
              !isLoggedIn ? (
                <SignUpPage
                  handleChangeState={handleChangeState}
                  userType="intern"
                  {...linkProps}
                />
              ) : (
                <Redirect to={DASHBOARD_URL} />
              )
            }
          />
          <Route
            path={SIGNUP_HOST}
            exact
            render={linkProps =>
              !isLoggedIn ? (
                <SignUpPage
                  handleChangeState={handleChangeState}
                  userType="host"
                  {...linkProps}
                />
              ) : (
                <Redirect to={DASHBOARD_URL} />
              )
            }
          />
          <Route
            path={SIGNUP_ORG}
            exact
            render={linkProps =>
              !isLoggedIn ? (
                <SignUpPage
                  handleChangeState={handleChangeState}
                  userType="organisation"
                  {...linkProps}
                />
              ) : (
                <Redirect to={DASHBOARD_URL} />
              )
            }
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
