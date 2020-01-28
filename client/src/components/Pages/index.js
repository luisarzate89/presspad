import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

//  COMMON COMPONENTS
import PrivateRoute from "../Common/PrivateRoute";
import NotFound from "../Common/NotFound";

import LandingPage from "./LandingPage";
import HostCreateProfile from "./HostCreateProfile";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Dashboard from "./Dashboard";
import HostProfile from "./HostProfile";
import InternCreateProfile from "./InternCreateProfile";
import AdminDashboard from "./AdminDashboard";
import SearchHosts from "./SearchHosts";
import BookingView from "./BookingView";
import MyProfile from "./MyProfile";
import AddReview from "./AddReview";
import InternProfile from "./InternProfile";

import {
  HOME_URL,
  SIGNIN_URL,
  SIGNUP_INTERN,
  SIGNUP_HOST,
  SIGNUP_ORG,
  DASHBOARD_URL,
  HOST_PROFILE,
  HOST_COMPLETE_PROFILE_URL,
  INTERN_COMPLETE_PROFILE_URL,
  ADMIN_DASHBOARD_URL,
  HOSTS_URL,
  BOOKING_VIEW_URL,
  MYPROFILE_URL,
  ADD_REVIWE_URL,
  INTERN_PROFILE
} from "../../constants/navRoutes";

export default function Pages(props) {
  const { handleChangeState, isLoggedIn, role, windowWidth } = props;

  return (
    <>
      <Switch>
        <Route path={HOME_URL} exact component={LandingPage} />
        <PrivateRoute
          exact
          path={HOST_PROFILE}
          Component={HostProfile}
          handleChangeState={handleChangeState}
          isLoggedIn={isLoggedIn}
          {...props}
        />
        <PrivateRoute
          path={BOOKING_VIEW_URL}
          Component={BookingView}
          {...props}
        />
        <Route
          exact
          path={HOSTS_URL}
          render={() => (
            <SearchHosts isLoggedIn={isLoggedIn} windowWidth={windowWidth} />
          )}
        />
        <PrivateRoute
          exact
          path={DASHBOARD_URL}
          Component={Dashboard}
          handleChangeState={handleChangeState}
          isLoggedIn={isLoggedIn}
          {...props}
        />
        {["host", "superhost"].includes(role) && (
          <PrivateRoute
            exact
            path={HOST_COMPLETE_PROFILE_URL}
            Component={HostCreateProfile}
            handleChangeState={handleChangeState}
            isLoggedIn={isLoggedIn}
            {...props}
          />
        )}
        {role === "admin" && (
          <PrivateRoute
            exact
            path={ADMIN_DASHBOARD_URL}
            Component={AdminDashboard}
            handleChangeState={handleChangeState}
            isLoggedIn={isLoggedIn}
            {...props}
          />
        )}
        {role === "intern" && (
          <PrivateRoute
            exact
            path={INTERN_COMPLETE_PROFILE_URL}
            Component={InternCreateProfile}
            handleChangeState={handleChangeState}
            isLoggedIn={isLoggedIn}
            {...props}
          />
        )}
        <PrivateRoute
          exact
          path={MYPROFILE_URL}
          Component={MyProfile}
          isLoggedIn={isLoggedIn}
          {...props}
        />
        <PrivateRoute
          exact
          path={INTERN_PROFILE}
          Component={InternProfile}
          isLoggedIn={isLoggedIn}
          {...props}
        />
        {["intern", "host", "superhost"].includes(role) && (
          <PrivateRoute
            exact
            path={ADD_REVIWE_URL}
            Component={AddReview}
            handleChangeState={handleChangeState}
            isLoggedIn={isLoggedIn}
            {...props}
          />
        )}
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
        {props.isMounted && <Route component={NotFound} />}
      </Switch>
    </>
  );
}
