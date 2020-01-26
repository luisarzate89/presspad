import React from "react";
import { Redirect } from "react-router-dom";

import { DASHBOARD_URL } from "../../../constants/navRoutes";

import HostCreateProfile from "../HostCreateProfile";
import InternProfile from "../InternProfile";

const MyProfile = props => {
  const { role } = props;

  if (role === "host" || role === "superhost") {
    return <HostCreateProfile {...props} />;
  }

  if (role === "intern") {
    return <InternProfile {...props} />;
  }

  if (role === "organisation") {
    return <Redirect to={DASHBOARD_URL} />;
  }
  return null;
};

export default MyProfile;
