import React, { Component } from "react";
import axios from "axios";
import { message } from "antd";

import Content from "./Content";
import {
  API_HOST_DASHBOARD_URL,
  API_DONATION_URL
} from "./../../../constants/apiRoutes";

class HostProfile extends Component {
  state = {
    name: "",
    nextGuest: {},
    nextBooking: {},
    nextGuestProfile: {},
    account: {},
    isNumberInputActive: false,
    // number of rows to be visible in the bookings table
    viewNumber: 3,
    // the amount of money that user want to donate
    donateValue: 0,
    // the amount of money that user want to withdraw
    withdrawValue: 0,
    // withdraw details
    bankName: null,
    bankSortCode: null,
    bankNumber: null,
    //
    //
    // Values came from api request
    bookings: [],
    updates: [],

    // MODALS
    withdrawModalOpen: false,
    donateModalOpen: false,
    apiLoading: false
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
        ","
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
      account = {}
    } = data;
    const nextGuest = bookings[0] && bookings[0].intern;
    const { profile: nextGuestProfile = {} } = nextGuest;
    this.setState({
      name,
      updates: notifications,
      bookings,
      profile,
      nextGuest,
      nextGuestProfile,
      nextBooking: bookings[0] || {},
      account
    });
  };

  handleBlurNumberInput = () => {
    this.setState({ isNumberInputActive: false });
  };

  handleFocusNumberInput = () => {
    this.setState({ isNumberInputActive: true });
  };

  handleNumberChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleInpuChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleViewMoreToggle = () => {
    const { viewNumber } = this.state;
    this.setState({ viewNumber: viewNumber ? undefined : 3 });
  };

  handleOpenModal = e => {
    const { name: modalField } = e.target;
    this.setState({ [modalField]: true });
  };

  handleCloseModals = () => {
    this.setState({
      withdrawModalOpen: false,
      donateModalOpen: false
    });
  };

  handleSubmitDonate = () => {
    // if(amount > 0)
    const { donateValue } = this.state;
    this.setState({ apiLoading: true }, () => {
      axios
        .post(API_DONATION_URL, { amount: donateValue })
        .then(() => {
          this.setState({ apiLoading: false });
          this.handleCloseModals();
          message.success(
            `Done!, You have successfully donated by £${donateValue}`
          );
          this.fetchData();
        })
        .catch(() => {
          message.error(`Error!, something went wrong`);
          this.setState({ apiLoading: false });
        });
    });
  };

  render() {
    const { windowWidth } = this.props;
    const {
      name,
      nextGuest,
      nextGuestProfile,
      bankName,
      bankSortCode,
      bankNumber,
      bookings,
      updates,
      withdrawModalOpen,
      donateModalOpen,
      nextBooking,
      account,
      apiLoading
    } = this.state;
    return (
      <Content
        // Props & state\
        windowWidth={windowWidth}
        name={name}
        bankName={bankName}
        bankSortCode={bankSortCode}
        bankNumber={bankNumber}
        bookings={bookings}
        updates={updates}
        withdrawModalOpen={withdrawModalOpen}
        donateModalOpen={donateModalOpen}
        nextGuest={nextGuest}
        nextGuestProfile={nextGuestProfile}
        nextBooking={nextBooking}
        account={account}
        apiLoading={apiLoading}
        // Functions
        handleBlurNumberInput={this.handleBlurNumberInput}
        handleFocusNumberInput={this.handleFocusNumberInput}
        handleNumberChange={this.handleNumberChange}
        handleInpuChange={this.handleInpuChange}
        handleViewMoreToggle={this.handleViewMoreToggle}
        handleOpenModal={this.handleOpenModal}
        handleCloseModals={this.handleCloseModals}
        handleSubmitDonate={this.handleSubmitDonate}
      />
    );
  }
}

export default HostProfile;
