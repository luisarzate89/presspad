import React, { Component } from "react";
import axios from "axios";
import { Empty } from "antd";

import BookingSection from "./BookingSection";
import BookingsTableSection from "./BookingsTableSection";
import PaymentsSection from "./PaymentsSection";
import Update from "../../Common/Update";
import { SectionTitle } from "./InternDashboard.style";
import {
  PageWrapper,
  SectionWrapperContent,
  UpdateList
} from "../../Common/general";

import { API_INTERN_DASHBOARD_URL } from "../../../constants/apiRoutes";

export default class InternDashboard extends Component {
  state = {
    bookings: [],
    installments: [],
    notifications: [],
    name: "",
    profileImage: ""
  };

  async componentDidMount() {
    const {
      data: {
        data: {
          bookings,
          installments,
          notifications,
          name,
          profile,
          nextBookingWithDetails
        }
      }
    } = await axios.get(API_INTERN_DASHBOARD_URL);

    this.setState({
      bookings,
      installments,
      notifications,
      name,
      profileImage: profile && profile.profileImage,
      nextBookingWithDetails
    });
  }

  render() {
    const {
      notifications,
      name,
      profileImage,
      bookings,
      installments,
      nextBookingWithDetails
    } = this.state;
    const { windowWidth, role } = this.props;

    return (
      <PageWrapper>
        <BookingSection
          data={{ name, profileImage, nextBookingWithDetails }}
          role={role}
        />
        <section>
          <SectionWrapperContent style={{ minHeight: 200 }}>
            <SectionTitle>Your updates</SectionTitle>
            {notifications.length > 0 ? (
              <UpdateList>
                {notifications.map(item => (
                  <Update item={item} key={item._id} userRole="intern" />
                ))}
              </UpdateList>
            ) : (
              <Empty description="No Updates yet, chill out!" />
            )}
          </SectionWrapperContent>
        </section>
        <BookingsTableSection data={bookings} windowWidth={windowWidth} />
        <PaymentsSection data={installments} />
      </PageWrapper>
    );
  }
}
