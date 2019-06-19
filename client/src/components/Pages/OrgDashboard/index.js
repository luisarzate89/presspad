import React, { Component } from "react";
import { message, Modal, Spin, Alert } from "antd";
import axios from "axios";

import Content from "./Content";

class OrganizationDashboard extends Component {
  state = {};

  render() {
    const { name } = this.props;
    return <Content name={name} state={this.state} />;
  }
}

export default OrganizationDashboard;
