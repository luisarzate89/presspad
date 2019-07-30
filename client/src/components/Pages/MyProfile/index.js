import React from 'react';
import { Redirect } from "react-router-dom";

import { DASHBOARD_URL } from '../../../constants/navRoutes';

import HostCreateProfile from '../HostCreateProfile';
import InternCreateProfile from '../InternCreateProfile';

const MyProfile = props => {
  const { role } = props;
  
  if (role === 'host' || role === 'superhost') {
    return <HostCreateProfile {...props} />
  }

  if (role === 'intern') {
    return <InternCreateProfile {...props} />
  }

  if (role === 'organisation') {
    return <Redirect to={DASHBOARD_URL} />;
  }
}

export default MyProfile;
