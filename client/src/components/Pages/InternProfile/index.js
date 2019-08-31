import React, { Component } from "react";

import AdminOrInternView from "./AdminOrInternView";
import HostView from "./HostView";

export default class InternProfile extends Component {
  render() {
    const { role } = this.props;
    switch (role) {
      case "intern":
      case "admin":
        return <AdminOrInternView {...this.props} />;

      case "host":
      case "superhost":
        return <HostView {...this.props} />;

      default:
        return (
          <div>
            <h1>Dashboard</h1>
            <p>Dashboard holding page</p>
          </div>
        );
    }
  }
}
