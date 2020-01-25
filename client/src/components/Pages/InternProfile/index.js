import React from "react";
import { Redirect } from "react-router-dom";

import AdminOrInternView from "./AdminOrInternView";
import HostView from "./HostView";
import { Error404 } from "../../../constants/navRoutes";

export default function InternProfile(props) {
  const { role } = props;
  switch (role) {
    case "intern":
      return <AdminOrInternView {...props} />;

    case "host":
    case "organisation":
      return <HostView {...props} />;

    default:
      return <Redirect to={Error404} />;
  }
}
