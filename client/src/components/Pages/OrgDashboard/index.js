import React, { Component } from "react";
import axios from "axios";

import { API_ORGS_DASHBOARD_URL } from "./../../../constants/apiRoutes";

import Content from "./Content";

class OrganizationDashboard extends Component {
  state = {
    details: {},
    notifications: [],
    interns: [],
    loaded: false
  };

  componentDidMount() {
    const { orgId } = this.props.match.params;
    axios.get(`${API_ORGS_DASHBOARD_URL}/${orgId}`).then(res => {
      const [details, notifications, interns] = res.data;

      this.setState({
        details: details[0] || {},
        notifications,
        interns,
        loaded: true
      });
    });
  }

  render() {
    const { name, windowWidth } = this.props;
    return <Content name={name} windowWidth={windowWidth} state={this.state} />;
  }
}

export default OrganizationDashboard;
