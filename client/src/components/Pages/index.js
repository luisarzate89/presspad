import React, { Component } from "react";
import { Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import SignInPage from "./SignInPage";

import { HOME_URL, SIGNIN_URL } from "./../../constants/navRoutes";

class Pages extends Component {
  render() {
    const { handleChangeState } = this.props;
    return (
      <>
        <Route path={HOME_URL} exact component={LandingPage} />
        <Route
          path={SIGNIN_URL}
          {...this.props}
          exact
          render={linkProps => (
            <SignInPage handleChangeState={handleChangeState} {...linkProps} />
          )}
        />
      </>
    );
  }
}

export default Pages;
