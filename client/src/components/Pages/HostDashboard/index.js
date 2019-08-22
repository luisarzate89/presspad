import React, { Component } from "react";

import Content from "./Content";

class HostProfile extends Component {
  state = {
    isNumberInputActive: false,
    // number of rows to be visible in the bookings table
    viewNumber: 3,
    // the amount of money that user want to donate
    donateValue: 0,
    // the amount of money that user want to withdraw
    withdrawValue: 0,
    // next guist is arriving in
    daysLeftToNextGuest: 10,
    // withdraw details
    bankName: null,
    bankSortCode: null,
    bankNumber: null,
    //
    //
    // Values came from api request
    income: "2,145.00",
    donation: "2,145.00",
    withdraw: "2,145.00",
    bookings: [],
    updates: [],

    // MODALS
    withdrawModalOpen: false,
    donateModalOpen: false
  };
  componentDidMount() {
    document.addEventListener("keypress", e => {
      const { isNumberInputActive } = this.state;
      // let key = e.key && Number(e.key);
      // if (isNaN(key) || e.key === null) {
      //   console.log("is not numeric");
      // } else {
      //   console.log("is numeric");
      // }
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
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
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

  render() {
    const { windowWidth } = this.props;
    const {
      bankName,
      bankSortCode,
      bankNumber,
      income,
      donation,
      withdraw,
      bookings,
      updates,
      withdrawModalOpen,
      donateModalOpen,
      daysLeftToNextGuest
    } = this.state;
    return (
      <Content
        // Props & state
        windowWidth={windowWidth}
        bankName={bankName}
        bankSortCode={bankSortCode}
        bankNumber={bankNumber}
        income={income}
        donation={donation}
        withdraw={withdraw}
        bookings={bookings}
        updates={updates}
        withdrawModalOpen={withdrawModalOpen}
        donateModalOpen={donateModalOpen}
        daysLeftToNextGuest={daysLeftToNextGuest}
        // Functions
        handleBlurNumberInput={this.handleBlurNumberInput}
        handleFocusNumberInput={this.handleFocusNumberInput}
        handleNumberChange={this.handleNumberChange}
        handleInpuChange={this.handleInpuChange}
        handleViewMoreToggle={this.handleViewMoreToggle}
        handleOpenModal={this.handleOpenModal}
        handleCloseModals={this.handleCloseModals}
      />
    );
  }
}

export default HostProfile;
