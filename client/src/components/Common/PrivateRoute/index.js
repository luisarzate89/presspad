import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';

import { SIGNIN_URL } from '../../../constants/navRoutes';

// import { Wrapper, SpinWrapper } from "./PrivateRoute.style";

const PrivateRoute = ({
  isMounted,
  isLoggedIn,
  Component,
  path,
  exact,
  ...rest
}) =>
  isMounted ? (
    <>
      <Route
        path={path}
        {...rest}
        render={LinkProps =>
          isLoggedIn ? (
            <Component {...LinkProps} {...rest} />
          ) : (
            <Redirect to={SIGNIN_URL} />
          )
        }
      />
    </>
  ) : (
    <>
      <Spin size="large" />
    </>
  );

export default PrivateRoute;
