import React from "react";

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
      return (
        <div>
          <h1>Dashboard</h1>
          <p>Dashboard holding page</p>
        </div>
      );
  }
}
