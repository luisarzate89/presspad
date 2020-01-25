import React from "react";
import { Redirect } from "react-router-dom";

import HostView from "./HostView";
import InternOrgView from "./InternOrgView";
import AdminView from "./AdminView";

export default function HostProfile(props) {
  const { role } = props;
  switch (role) {
    case "admin":
      return <AdminView {...props} />;
    case "organisation":
    case "intern":
      return <InternOrgView {...props} />;
    case "host":
      return <HostView {...props} />;
    default:
      return <Redirect to="/404" />;
  }
}
