import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Calendar from "react-calendar/dist/entry.nostyle";
import moment from "moment";
import axios from "axios";
import { Spin, Alert, Icon, Modal } from "antd";
import {
  createDatesArray,
  getDateRangeFromArray,
  calculatePrice,
} from "../../../helpers";

import {
  API_BOOKING_REQUEST_URL,
  API_GET_INTERN_STATUS,
} from "../../../constants/apiRoutes";

import {
  CalendarWrapper,
  PricingDiv,
  PriceHeadline,
  PriceLabel,
  RequestBtn,
  ErrorDiv,
} from "./Calendar.style";

import { INTERN_COMPLETE_PROFILE_URL } from "../../../constants/navRoutes";

const bookingRequest = (url, data) => axios.post(url, data);

class CalendarComponent extends Component {
  state = {
    isLoading: true,
    avDates: [],
    dates: new Date(),
    isRangeSelected: false,
    price: 0,
    bookingExists: false,
    message: "",
    messageType: "",
    isBooking: false,
  };

  componentDidMount() {
    const { availableDates } = this.props;
    let avDateRange;
    if (availableDates) {
      avDateRange = getDateRangeFromArray(availableDates);
    }

    this.setState({
      avDates: avDateRange || [],
      isLoading: false,
    });
  }

  // to disable "Request Stay" button when the user starts to select a range
  onDayClick = () => {
    this.setState({ isRangeSelected: false });
  };

  // updates state
  onChange = dates => {
    const { internBookings } = this.props;

    this.setState({
      dates,
      isRangeSelected: true,
      price: calculatePrice(moment.range(dates[0], dates[1])),
      message: "",
      messageType: "",
    });
    // check if booking exists and update state
    this.bookingFound(dates, internBookings);
  };

  // disables calendar tiles (days)
  tileDisabled = ({ date }) => {
    const { avDates } = this.state;
    // return true if current date is not included in available dates => disable tile
    date = moment(date).format("YYYY-MM-DD");
    return (
      !avDates.includes(date) ||
      moment
        .utc()
        .startOf("day")
        .add(7, "days")
        .isAfter(date)
    ); // Block day tiles only
  };

  goToCompleteProfile = () => {
    this.props.history.push(INTERN_COMPLETE_PROFILE_URL);
  };

  showAlertAndRedirectToProfile = message => {
    Modal.warning({
      title: "Sorry! You can't make a request.",
      content: message,
      onOk: this.goToCompleteProfile,
      onCancel: this.goToCompleteProfile,
    });
  };

  handleClick = async () => {
    const { dates, price } = this.state;
    const { currentUserId, listingId, hostId } = this.props;
    const data = {
      listing: listingId,
      intern: currentUserId,
      host: hostId,
      startDate: moment(dates[0]).format("YYYY-MM-DD"),
      endDate: moment(dates[1]).format("YYYY-MM-DD"),
      price,
    };

    let message = "";
    try {
      this.setState({ isBooking: true });
      const {
        data: { verified, isComplete },
      } = await axios.get(API_GET_INTERN_STATUS);
      if (!verified) {
        message = "You can't make a request until you get verified";
      } else if (!isComplete) {
        message = "You need to complete your profile";
      }

      if (!verified || !isComplete) {
        this.showAlertAndRedirectToProfile(message);
      }

      this.setState({ message, messageType: "error" });
      if (verified && isComplete) {
        bookingRequest(API_BOOKING_REQUEST_URL, data)
          .then(res => {
            this.setState({
              message: "Booking request sent successfully",
              messageType: "success",
              isBooking: false,
            });
          })
          .catch(error => {
            const resMsg = error.response.data.error;

            const message = resMsg.includes(
              "user has already a booking request",
            )
              ? "It seems like you have already requested a booking during those dates. You can only make one request at a time."
              : "Something went wrong, please try again";
            this.setState({
              isBooking: false,
              messageType: "error",
              message,
            });
          });
      }
    } catch (err) {
      if (err && err.response && err.response.status === 404) {
        const message =
          "You need to have a profile in order to be able to book stay";

        this.showAlertAndRedirectToProfile(message);
        this.setState({
          isBooking: false,
          messageType: "error",
          message,
        });
      }
    }
  };

  bookingFound = (selectedDates, existingBookingDates) => {
    let bookingDatesFound;
    if (selectedDates.length > 0) {
      selectedDates = createDatesArray(selectedDates[0], selectedDates[1]);
      bookingDatesFound = selectedDates.some(date =>
        existingBookingDates.includes(date),
      );
    } else bookingDatesFound = false;
    // if no booking selected or dates are already part of exiting user bookings
    // disable request btn
    return bookingDatesFound
      ? this.setState({
          bookingExists: true,
          messageType: "error",
          message:
            "It seems like you have already requested a booking during those dates. You can only make one request at a time.",
        })
      : this.setState({ bookingExists: false });
  };

  render() {
    const {
      price,
      isRangeSelected,
      bookingExists,
      message,
      messageType,
      isLoading,
      isBooking,
    } = this.state;
    const { adminView, role } = this.props;

    if (isLoading) return <Spin tip="Loading Profile" />;

    return (
      <div>
        <CalendarWrapper>
          <Calendar
            prev2Label={null}
            next2Label={null}
            tileDisabled={this.tileDisabled}
            onChange={this.onChange}
            onClickDay={this.onDayClick}
            value={this.state.date}
            locale="en-t-jp"
            maxDetail="month"
            minDetail="month"
            selectRange
            formatShortWeekday={(locale, value) =>
              ["S", "M", "T", "W", "T", "F", "S"][moment(value).day()]
            }
          />
        </CalendarWrapper>
        {role !== "host" && role !== "superhost" && role !== "organisation" && (
          <PricingDiv>
            <PriceHeadline>Full price for period</PriceHeadline>
            <PriceLabel>£{price}</PriceLabel>

            {message && (
              <ErrorDiv>
                <Alert message={message} type={messageType} />
              </ErrorDiv>
            )}

            <RequestBtn
              onClick={this.handleClick}
              disabled={
                !isRangeSelected || bookingExists || adminView || isBooking
              }
            >
              <Spin
                spinning={isBooking}
                indicator={
                  <Icon
                    type="loading"
                    style={{
                      fontSize: 24,
                      marginRight: "8px",
                      color: "white",
                    }}
                    spin
                  />
                }
              />
              Request Stay
            </RequestBtn>
          </PricingDiv>
        )}
      </div>
    );
  }
}
export default withRouter(CalendarComponent);
