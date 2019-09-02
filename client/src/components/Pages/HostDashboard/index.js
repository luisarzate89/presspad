import React, { Component } from "react";
import axios from "axios";
import { message } from "antd";

import Content from "./Content";
import {
  API_HOST_DASHBOARD_URL,
  API_DONATION_URL,
  API_WITHDRAW_REQUEST_URL
} from "./../../../constants/apiRoutes";

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
    withdrawRequests: [],

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
      account = {},
      withdrawRequests
    } = data;
    const nextGuest = (bookings[0] && bookings[0].intern) || {};
    const { profile: nextGuestProfile = {} } = nextGuest;
    this.setState({
      name,
      updates: notifications,
      bookings,
      profile,
      nextGuest,
      nextGuestProfile,
      nextBooking: bookings[0] || {},
      account,
      donateValue: account.currentBalance,
      withdrawValue: account.currentBalance,
      withdrawRequests
    });
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
      donateModalOpen: false,
      errors: {},
      attemptedToSubmit: false
    });
  };

  handleSubmitDonate = () => {
    const { donateValue } = this.state;
    this.setState({ attemptedToSubmit: true }, () => {
      this.validate(donateSchema).then(res => {
        res &&
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
      });
    });
  };

  handleSubmitWithdrawRequest = () => {
    const { withdrawValue, bankName, bankSortCode, accountNumber } = this.state;
    this.setState({ attemptedToSubmit: true }, () => {
      this.validate(withdrawSchema).then(res => {
        res &&
          this.setState({ apiLoading: true }, () => {
            axios
              .post(API_WITHDRAW_REQUEST_URL, {
                amount: withdrawValue,
                bankName,
                bankSortCode,
                accountNumber
              })
              .then(() => {
                this.setState({ apiLoading: false });
                this.handleCloseModals();
                message.success(
                  `Done!, You have requested to withdraw £${withdrawValue}`
                );
                this.fetchData();
              })
              .catch(() => {
                message.error(`Error!, something went wrong`);
                this.setState({ apiLoading: false });
              });
          });
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

  render() {
    const { windowWidth } = this.props;
    const {
      name,
      nextGuest,
      nextGuestProfile,
      bankName,
      bankSortCode,
      accountNumber,
      bookings,
      updates,
      withdrawModalOpen,
      donateModalOpen,
      nextBooking,
      account,
      apiLoading,
      errors,
      withdrawRequests
    } = this.state;
    return (
      <Content
        // Props & state\
        windowWidth={windowWidth}
        name={name}
        bankName={bankName}
        bankSortCode={bankSortCode}
        accountNumber={accountNumber}
        bookings={bookings}
        updates={updates}
        withdrawModalOpen={withdrawModalOpen}
        donateModalOpen={donateModalOpen}
        nextGuest={nextGuest}
        nextGuestProfile={nextGuestProfile}
        nextBooking={nextBooking}
        account={account}
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
      />
    );
  }
}

export default HostProfile;
