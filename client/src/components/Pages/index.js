import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

//  COMMON COMPONENTS
import PrivateRoute from "./../Common/PrivateRoute";

import LandingPage from "./LandingPage";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Dashboard from "./Dashboard";

import {
  HOME_URL,
  SIGNIN_URL,
  SIGNUP_INTERN,
  SIGNUP_HOST,
  SIGNUP_ORG,
  DASHBOARD_URL
} from "./../../constants/navRoutes";

class Pages extends Component {
  render() {
    const { handleChangeState, isLoggedIn } = this.props;
    return (
      <>
        <Switch>
          <Route path={HOME_URL} exact component={LandingPage} />
          <PrivateRoute
            exact
            path={DASHBOARD_URL}
            Component={Dashboard}
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
