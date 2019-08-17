import React, { Component } from "react";

import OrgDashboard from "./../OrgDashboard";
import InternDashboard from "./../InternDashboard";

export default class Dashboard extends Component {
  render() {
    const { role } = this.props;
    switch (role) {
      case "organisation":
        return <OrgDashboard {...this.props} />;

      case "intern":
        return <InternDashboard {...this.props} />;
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
