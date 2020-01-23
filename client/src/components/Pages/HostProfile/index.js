import React from "react";
import { Redirect } from "react-router-dom";

// import HostView from "./old_index";
import InternView from "./InternView";
import AdminView from "./AdminView";

export default function HostProfile(props) {
  const { role } = props;
  switch (role) {
    case "admin":
      return <AdminView {...props} />;
    case "intern":
      return <InternView {...props} />;
    case "host":
      return <h1>HOST_PROFILE -- Host View (MY PROFILE)</h1>;
    default:
      return <Redirect to="/404" />;
  }
}
