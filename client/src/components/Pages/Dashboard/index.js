import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import OrgDashboard from '../OrgDashboard';
import InternDashboard from '../InternDashboard';
import HostDashboard from '../HostDashboard';

import { ADMIN_DASHBOARD_URL, Error404 } from '../../../constants/navRoutes';

export default class Dashboard extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { role } = this.props;
    switch (role) {
      case 'organisation':
        return <OrgDashboard {...this.props} />;

      case 'intern':
        return <InternDashboard {...this.props} />;

      case 'host':
      case 'superhost':
        return <HostDashboard {...this.props} />;

      case 'admin':
        return <Redirect to={ADMIN_DASHBOARD_URL} />;

      default:
        return <Redirect to={Error404} />;
    }
  }
}
