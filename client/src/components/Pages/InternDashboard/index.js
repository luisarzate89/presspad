import React, { Component } from "react";
import axios from "axios";
import { Empty, message } from "antd";
import moment from "moment";

import BookingSection from "./BookingSection";
import BookingsTableSection from "./BookingsTableSection";
import PaymentsSection from "./PaymentsSection";
import Update from "../../Common/Update";
import { SectionTitle } from "./InternDashboard.style";
import {
  PageWrapper,
  SectionWrapperContent,
  UpdateList,
  BlueLink,
} from "../../Common/general";

import {
  API_INTERN_DASHBOARD_URL,
  API_NOTIFICATION_URL,
} from "../../../constants/apiRoutes";

export default class InternDashboard extends Component {
  state = {
    bookings: [],
    installments: [],
    notifications: [],
    slicedNotifications: [],
    viewNotificationNum: 3,
    name: "",
    profileImage: "",
    markAsSeen: false,
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
          nextBookingWithDetails,
        },
      },
    } = await axios.get(API_INTERN_DASHBOARD_URL);

    const sortedNotification = notifications.sort((a, b) => {
      if (moment(a.createdAt).isAfter(b.createdAt)) {
        return -1;
      }
      return 1;
    });

    this.setState(({ viewNotificationNum }) => ({
      bookings,
      installments,
      notifications: sortedNotification,
      slicedNotifications: sortedNotification.slice(0, viewNotificationNum),
      name,
      profileImage: profile && profile.profileImage,
      nextBookingWithDetails,
    }));
  }

  markAsSeen = async () => {
    const { slicedNotifications, notifications, markAsSeen } = this.state;
    if (!markAsSeen) {
      try {
        const newNotifications = slicedNotifications.map(ele => ({ ...ele }));
        const notificationsIds = slicedNotifications.reduce((acc, curr, i) => {
          if (!curr.seen) {
            acc.push(curr._id);
            newNotifications[i].loading = true;
          }
          return acc;
        }, []);

        this.setState({
          markAsSeen: true,
          slicedNotifications: newNotifications,
        });

        if (notificationsIds[0]) {
          await axios.patch(`${API_NOTIFICATION_URL}/seen`, notificationsIds);

          const updatedNotifications = notifications.map(update => {
            if (notificationsIds.includes(update._id)) {
              return {
                ...update,
                seen: true,
                loading: false,
              };
            }
            return update;
          });

          this.setState(({ viewNotificationNum }) => ({
            notifications: updatedNotifications,
            slicedNotifications: viewNotificationNum
              ? updatedNotifications.slice(0, viewNotificationNum)
              : updatedNotifications,
          }));
        }
      } catch (error) {
        this.setState({ markAsSeen: false, notifications });
        message.error("Something went wrong");
      }
    }
  };

  handleViewMoreToggle = ({
    target: {
      dataset: { name },
    },
  }) => {
    if (name === "updates") {
      this.setState(({ viewNotificationNum, notifications }) => ({
        viewNotificationNum: viewNotificationNum ? undefined : 3,
        slicedNotifications: viewNotificationNum
          ? notifications
          : notifications.slice(0, 3),
        markAsSeen: false,
      }));
    }
  };

  render() {
    const {
      slicedNotifications,
      notifications,
      viewNotificationNum,
      name,
      profileImage,
      bookings,
      installments,
      nextBookingWithDetails,
    } = this.state;
    const { windowWidth, role } = this.props;

    return (
      <PageWrapper>
        <BookingSection
          data={{ name, profileImage, nextBookingWithDetails }}
          role={role}
        />
        <section>
          <SectionWrapperContent
            onMouseEnter={this.markAsSeen}
            onTouchStart={this.markAsSeen}
            style={{ minHeight: 200 }}
          >
            <SectionTitle>Your updates</SectionTitle>
            {slicedNotifications.length > 0 ? (
              <UpdateList>
                {slicedNotifications.map(item => (
                  <Update item={item} key={item._id} userRole="intern" />
                ))}
              </UpdateList>
            ) : (
              <Empty description="No Updates yet, chill out!" />
            )}
            {notifications.length > 3 && (
              <BlueLink
                to="#"
                data-name="updates"
                onClick={this.handleViewMoreToggle}
                style={{ marginTop: "2rem", textAlign: "center" }}
              >
                {viewNotificationNum ? "View more" : "View less"}
              </BlueLink>
            )}
          </SectionWrapperContent>
        </section>
        <BookingsTableSection data={bookings} windowWidth={windowWidth} />
        <PaymentsSection data={installments} />
      </PageWrapper>
    );
  }
}
