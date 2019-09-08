import React, { Component } from "react";
import Calendar from "react-calendar/dist/entry.nostyle";
import moment from "moment";
import axios from "axios";
import { Spin, Alert, Icon } from "antd";
import { createDatesArray, getDateRangeFromArray } from "../../../helpers";

import {
  API_BOOKING_REQUEST_URL,
  API_GET_INTERN_STATUS
} from "../../../constants/apiRoutes";

import {
  CalendarWrapper,
  PricingDiv,
  PriceHeadline,
  PriceLabel,
  RequestBtn,
  ErrorDiv
} from "./Calendar.style";

const bookingRequest = (url, data) => axios.post(url, data);

const countDays = dates => {
  const start = moment(dates[0]);
  const end = moment(dates[1]);
  return end.diff(start, "days");
};

const calculatePrice = dates => {
  const start = moment(dates[0]);
  const end = moment(dates[1]);

  const weeks = end.diff(start, "weeks");
  const days = end.diff(start, "days") % 7;

  return weeks * 150 + days * 20;
};

class CalendarComponent extends Component {
  state = {
    isLoading: true,
    avDates: [],
    dates: new Date(),
    noNights: null,
    price: 0,
    bookingExists: false,
    message: "",
    messageType: "",
    isBooking: false
  };

  componentDidMount() {
    const { availableDates } = this.props;
    const avDateRange = getDateRangeFromArray(availableDates);

    this.setState({
      avDates: avDateRange,
      isLoading: false
    });
  }

  // updates state
  onChange = dates => {
    const { internBookings } = this.props;

    this.setState({
      dates,
      noNights: countDays(dates),
      price: calculatePrice(dates),
      message: "",
      messageType: ""
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
      moment.utc()
        .startOf("day")
        .add(7, "days")
        .isAfter(date)
    ); // Block day tiles only
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
      price: price
    };

    let message = "";
    try {
      this.setState({ isBooking: true });
      const {
        data: { verified, isComplete }
      } = await axios.get(API_GET_INTERN_STATUS);
      if (!verified) {
        message = "You can't make a request until you get verified";
      } else if (!isComplete) {
        message = "You need to complete your profile";
      }

      this.setState({ message, messageType: "error" });
      if (verified && isComplete) {
        bookingRequest(API_BOOKING_REQUEST_URL, data)
          .then(res => {
            this.setState({
              message: "Booking request sent successfully",
              messageType: "success",
              isBooking: false
            });
          })
          .catch(error => {
            this.setState({
              isBooking: false,
              messageType: "error",
              message:
                "It seems like you have already requested a booking during those dates. You can only make one request at a time."
            });
          });
      }
    } catch (err) {
      if (err && err.response && err.response.status === 404) {
        this.setState({
          isBooking: false,
          messageType: "error",
          message: "You need to have a profile in order to be able to book stay"
        });
      }
    }
  };

  bookingFound = (selectedDates, existingBookingDates) => {
    let bookingDatesFound;
    if (selectedDates.length > 0) {
      selectedDates = createDatesArray(selectedDates[0], selectedDates[1]);
      bookingDatesFound = selectedDates.some(date =>
        existingBookingDates.includes(date)
      );
    } else bookingDatesFound = false;
    // if no booking selected or dates are already part of exiting user bookings
    // disable request btn
    return bookingDatesFound
      ? this.setState({
          bookingExists: true,
          messageType: "error",
          message:
            "It seems like you have already requested a booking during those dates. You can only make one request at a time."
        })
      : this.setState({ bookingExists: false });
  };

  render() {
    const {
      price,
      noNights,
      bookingExists,
      message,
      messageType,
      isLoading,
      isBooking
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
            value={this.state.date}
            locale="en-t-jp"
            maxDetail="month"
            minDetail="month"
            selectRange={true}
            formatShortWeekday={(locale, value) =>
              ["S", "M", "T", "W", "T", "F", "S"][moment(value).day()]
            }
          />
        </CalendarWrapper>
        {role !== "host" && role !== "superhost" && (
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
                noNights === 0 ||
                noNights === null ||
                bookingExists ||
                adminView ||
                isBooking
              }
            >
              <Spin
                spinning={isBooking}
                indicator={
                  <Icon
                    type="loading"
                    style={{ fontSize: 24, marginRight: "8px", color: "white" }}
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
export default CalendarComponent;
