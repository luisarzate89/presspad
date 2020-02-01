import React from "react";
import { Redirect } from "react-router-dom";

import HostView from "./HostView";
import InternOrgView from "./InternOrgView";
import AdminView from "./AdminView";
import { Error404 } from "../../../constants/navRoutes";

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
      return <Redirect to={Error404} />;
  }
}
