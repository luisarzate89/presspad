import React from "react";
import { Redirect } from "react-router-dom";

import AdminOrInternView from "./AdminOrInternView";
import HostView from "./HostView";

export default function InternProfile(props) {
  const { role } = props;
  switch (role) {
    case "intern":
    case "admin":
      return <AdminOrInternView {...props} />;

    case "host":
    case "superhost":
      return <HostView {...props} />;

    default:
      return <Redirect to="/404" />;
  }
}
