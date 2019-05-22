import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import LandingPage from "./LandingPage";
import SignInPage from "./SignInPage";

import { HOME_URL, SIGNIN_URL } from "./../../constants/navRoutes";

class Pages extends Component {
  render() {
    const { handleChangeState } = this.props;
    console.log("PAGE", handleChangeState);
    return (
      <>
        <Switch>
          <Route path={HOME_URL} exact component={LandingPage} />
          <Route
            path={SIGNIN_URL}
            exact
            handleChangeState={handleChangeState}
            anyProps="hello"
            component={SignInPage}
          />
        </Switch>
      </>
    );
  }
}

export default Pages;
