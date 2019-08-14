import React, { Component } from "react";
import axios from "axios";

import BookingSection from "./BookingSection";
import PaymentsSection from "./PaymentsSection";
import Update from "./Update";
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
          profile: { profileImage }
        }
      }
    } = await axios.get(API_INTERN_DASHBOARD_URL);

    this.setState({
      bookings,
      installments,
      notifications,
      name,
      profileImage
    });
  }

  render() {
    const {
      notifications,
      name,
      profileImage,
      bookings,
      installments
    } = this.state;

    return (
      <PageWrapper>
        <BookingSection data={{ name, profileImage, bookings }} />
        <section>
          <SectionWrapperContent style={{ minHeight: 200 }}>
            <SectionTitle>Your updates</SectionTitle>
            <UpdateList>
              {notifications.map(item => (
                <Update item={item} key={item._id} />
              ))}
            </UpdateList>
          </SectionWrapperContent>
        </section>
        <PaymentsSection data={installments} />
      </PageWrapper>
    );
  }
}
