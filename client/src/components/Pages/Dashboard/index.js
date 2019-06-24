import React, { Component } from "react";
import OrgDashboard from "./../OrgDashboard";
export default class Dashboard extends Component {
  render() {
    const { role } = this.props;
    switch (role) {
      case "organisation":
        return <OrgDashboard {...this.props} />;

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
