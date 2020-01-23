import React from "react";
import { Redirect } from "react-router-dom";

// import HostView from "./old_index";
import InternView from "./InternView";

export default function HostProfile(props) {
  const { role } = props;
  switch (role) {
    case "admin":
      return <h1>HOST_PROFILE -- Admin View</h1>;
    case "intern":
      return <InternView {...props} />;
    case "host":
      return <h1>HOST_PROFILE -- Host View (MY PROFILE)</h1>;
    default:
      return <Redirect to="/404" />;
  }
}
