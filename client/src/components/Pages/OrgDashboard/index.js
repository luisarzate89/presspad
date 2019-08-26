import React, { Component } from "react";
import axios from "axios";

import { API_ORGS_DASHBOARD_URL } from "./../../../constants/apiRoutes";

import Content from "./Content";

class OrganizationDashboard extends Component {
  state = {
    details: {},
    notifications: [],
    coupons: [],
    account: {},
    loaded: false
  };

  componentDidMount() {
    axios.get(API_ORGS_DASHBOARD_URL).then(res => {
      const [details, notifications, coupons] = res.data;

      const { account } = details[0];
      this.setState({
        details: details[0] || {},
        notifications,
        account,
        coupons,
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
