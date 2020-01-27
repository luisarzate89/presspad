import React, { Component } from "react";
import axios from "axios";
import { message } from "antd";
import moment from "moment";

import Content from "./Content";
import {
  API_HOST_DASHBOARD_URL,
  API_DONATION_URL,
  API_WITHDRAW_REQUEST_URL,
  API_NOTIFICATION_URL,
} from "../../../constants/apiRoutes";

import { withdrawSchema, donateSchema } from "./schemas";

class HostProfile extends Component {
  state = {
    name: "",
    nextGuest: {},
    nextBooking: {},
    nextGuestProfile: {},
    account: {},
    errors: {},
    isNumberInputActive: false,
    attemptedToSubmit: false,
    // number of rows to be visible in the bookings table
    viewNumber: 3,
    viewNotificationNum: 3,
    // the amount of money that user want to donate
    donateValue: null,
    // the amount of money that user want to withdraw
    withdrawValue: null,
    // withdraw details
    bankName: null,
    bankSortCode: null,
    accountNumber: null,

    // Values came from api request
    bookings: [],
    updates: [],
    slicedUpdates: [],
    markAsSeen: false,
    withdrawRequests: [],

    // MODALS
    withdrawModalOpen: false,
    donateModalOpen: false,
    apiLoading: false,
    profile: {},
  };

  async componentDidMount() {
    this.fetchData();
    document.addEventListener("keypress", e => {
      const { isNumberInputActive } = this.state;
      const numbers = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        ".",
        ",",
      ];
      if (!numbers.includes(e.key) && isNumberInputActive) {
        e.preventDefault();
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", () => {});
  }

  fetchData = async () => {
    const { data } = await axios.get(API_HOST_DASHBOARD_URL);
    const {
      name,
      notifications,
      bookings = [],
      profile = {},
      account = {},
      withdrawRequests,
      nextBookingWithDetails: nextBooking = {},
    } = data;
    const nextGuest = (nextBooking && nextBooking.intern) || {};
    const { profile: nextGuestProfile = {} } = nextGuest;

    const sortedNotification = notifications.sort((a, b) => {
      if (moment(a.createdAt).isAfter(b.createdAt)) {
        return -1;
      }
      return 1;
    });

    this.setState(({ viewNotificationNum }) => ({
      name,
      updates: sortedNotification,
      slicedUpdates: sortedNotification.slice(0, viewNotificationNum),
      bookings,
      profile,
      nextGuest,
      nextGuestProfile,
      nextBooking,
      account,
      donateValue: account.currentBalance,
      withdrawValue: account.currentBalance,
      withdrawRequests,
    }));
  };

  handleBlurNumberInput = () => {
    this.setState({ isNumberInputActive: false });
  };

  handleFocusNumberInput = () => {
    this.setState({ isNumberInputActive: true });
  };

  handleNumberChange = (name, value) => {
    const { attemptedToSubmit, withdrawModalOpen } = this.state;

    this.setState({ [name]: value }, () => {
      if (attemptedToSubmit) {
        this.validate(withdrawModalOpen ? withdrawSchema : donateSchema);
      }
    });
  };

  handleInpuChange = e => {
    const { attemptedToSubmit, withdrawModalOpen } = this.state;
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      if (attemptedToSubmit) {
        this.validate(withdrawModalOpen ? withdrawSchema : donateSchema);
      }
    });
  };

  handleViewMoreToggle = ({
    target: {
      dataset: { name },
    },
  }) => {
    if (name === "updates") {
      this.setState(({ viewNotificationNum, updates }) => ({
        viewNotificationNum: viewNotificationNum ? undefined : 3,
        slicedUpdates: viewNotificationNum ? updates : updates.slice(0, 3),
        markAsSeen: false,
      }));
    } else {
      const { viewNumber } = this.state;
      this.setState({ viewNumber: viewNumber ? undefined : 3 });
    }
  };

  handleOpenModal = e => {
    const { name: modalField } = e.target;
    this.setState({ [modalField]: true });
  };

  handleCloseModals = () => {
    this.setState({
      withdrawModalOpen: false,
      donateModalOpen: false,
      errors: {},
      attemptedToSubmit: false,
    });
  };

  handleSubmitDonate = () => {
    const { donateValue } = this.state;
    this.setState({ attemptedToSubmit: true }, () => {
      this.validate(donateSchema).then(res => {
        if (res) {
          this.setState({ apiLoading: true }, () => {
            axios
              .post(API_DONATION_URL, { amount: donateValue })
              .then(() => {
                this.setState({ apiLoading: false });
                this.handleCloseModals();
                message.success(
                  `Done!, You have successfully donated by £${donateValue}`,
                );
                this.fetchData();
              })
              .catch(() => {
                message.error(`Error!, something went wrong`);
                this.setState({ apiLoading: false });
              });
          });
        }
      });
    });
  };

  handleSubmitWithdrawRequest = () => {
    const { withdrawValue, bankName, bankSortCode, accountNumber } = this.state;
    this.setState({ attemptedToSubmit: true }, () => {
      this.validate(withdrawSchema).then(res => {
        if (res) {
          this.setState({ apiLoading: true }, () => {
            axios
              .post(API_WITHDRAW_REQUEST_URL, {
                amount: withdrawValue,
                bankName,
                bankSortCode,
                accountNumber,
              })
              .then(() => {
                this.setState({ apiLoading: false });
                this.handleCloseModals();
                message.success(
                  `Done!, You have requested to withdraw £${withdrawValue}`,
                );
                this.fetchData();
              })
              .catch(() => {
                message.error(`Error!, something went wrong`);
                this.setState({ apiLoading: false });
              });
          });
        }
      });
    });
  };

  validate = schema => {
    const { account } = this.state;
    return schema(account.currentBalance)
      .validate(this.state, { abortEarly: false })
      .then(res => {
        this.setState({ errors: {} });
        return res;
      })
      .catch(err => {
        const errors = {};
        err.inner.forEach(element => {
          errors[element.path.split(".")[0]] = element.message;
        });
        this.setState({ errors });
      });
  };

  markAsSeen = async () => {
    const { slicedUpdates, updates, markAsSeen } = this.state;
    if (!markAsSeen) {
      try {
        const newUpdates = slicedUpdates.map(ele => ({ ...ele }));
        const notificationsIds = slicedUpdates.reduce((acc, curr, i) => {
          if (!curr.seen) {
            acc.push(curr._id);
            newUpdates[i].loading = true;
          }
          return acc;
        }, []);

        this.setState({ markAsSeen: true, slicedUpdates: newUpdates });

        if (notificationsIds[0]) {
          this.setState({ updates: newUpdates });
          await axios.patch(`${API_NOTIFICATION_URL}/seen`, notificationsIds);

          const updatedNotifications = updates.map(update => {
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
            updates: updatedNotifications,
            slicedUpdates: viewNotificationNum
              ? updatedNotifications.slice(0, viewNotificationNum)
              : updatedNotifications,
          }));
        }
      } catch (error) {
        this.setState({ markAsSeen: false, slicedUpdates });
        message.error("Something went wrong");
      }
    }
  };

  render() {
    const { windowWidth, role } = this.props;
    const {
      name,
      nextGuest,
      nextGuestProfile,
      bankName,
      bankSortCode,
      accountNumber,
      bookings,
      updates,
      slicedUpdates,
      withdrawModalOpen,
      donateModalOpen,
      nextBooking,
      account,
      apiLoading,
      errors,
      withdrawRequests,
      profile,
      viewNumber,
      viewNotificationNum,
    } = this.state;
    return (
      <Content
        // Props & state\
        windowWidth={windowWidth}
        name={name}
        role={role}
        bankName={bankName}
        bankSortCode={bankSortCode}
        accountNumber={accountNumber}
        bookings={bookings}
        viewNumber={viewNumber}
        viewNotificationNum={viewNotificationNum}
        updates={updates}
        slicedUpdates={slicedUpdates}
        withdrawModalOpen={withdrawModalOpen}
        donateModalOpen={donateModalOpen}
        nextGuest={nextGuest}
        nextGuestProfile={nextGuestProfile}
        nextBooking={nextBooking}
        account={account}
        profile={profile}
        apiLoading={apiLoading}
        withdrawRequests={withdrawRequests}
        errors={errors}
        // Functions
        handleBlurNumberInput={this.handleBlurNumberInput}
        handleFocusNumberInput={this.handleFocusNumberInput}
        handleNumberChange={this.handleNumberChange}
        handleInpuChange={this.handleInpuChange}
        handleViewMoreToggle={this.handleViewMoreToggle}
        handleOpenModal={this.handleOpenModal}
        handleCloseModals={this.handleCloseModals}
        handleSubmitDonate={this.handleSubmitDonate}
        handleSubmitWithdrawRequest={this.handleSubmitWithdrawRequest}
        markAsSeen={this.markAsSeen}
      />
    );
  }
}

export default HostProfile;
