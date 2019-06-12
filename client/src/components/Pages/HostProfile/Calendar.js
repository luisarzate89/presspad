import React, { Component } from "react";
import Calendar from "react-calendar/dist/entry.nostyle";
import moment from "moment";
import axios from "axios";
import { API_BOOKING_REQUEST_URL } from "../../../constants/apiRoutes";

import {
  CalendarWrapper,
  PricingDiv,
  PriceHeadline,
  PriceLabel,
  RequestBtn
} from "./Calendar.style";

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

// creates array of all available dates for listing
const getAvailableDates = datesArray => {
  const avDatesArray = [];

  // get all available dates in range
  datesArray.forEach(el => {
    let currentDate = moment(el.startDate);
    const stopDate = moment(el.endDate);

    while (currentDate <= stopDate) {
      avDatesArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }
  });
  // get all days in month of current date and stop date

  return avDatesArray;
};

class CalendarComponent extends Component {
  state = {
    avDates: [],
    dates: new Date(),
    noNights: null,
    price: 0
  };

  componentDidMount() {
    const { availableDates } = this.props;
    const avDateRange = getAvailableDates(availableDates);

    this.setState({
      avDates: avDateRange
    });
  }

  // updates state
  onChange = dates => {
    this.setState({
      dates,
      noNights: countDays(dates),
      price: calculatePrice(dates)
    });
  };

  // disables calendar tiles (days)
  tileDisabled = ({ date }) => {
    const { avDates } = this.state;
    // //  return true if current date is not included in available dates => disable tile
    date = moment(date).format("YYYY-MM-DD");
    return !avDates.includes(date); // Block day tiles only
  };

  handleClick = () => {
    const { dates, price } = this.state;
    const { internId, listingId } = this.props;
    const bookingRequest = {
      listing: listingId,
      user: internId,
      startDate: moment(dates[0]).format("YYYY-MM-DD"),
      endDate: moment(dates[1]).format("YYYY-MM-DD"),
      payment: price
    };

    axios
      .post(API_BOOKING_REQUEST_URL, bookingRequest)
      .then(() => console.log("sucess"))
      .catch(() => console.log("fail"));
  };

  render() {
    const { price } = this.state;

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
        <PricingDiv>
          <PriceHeadline>Full price for period</PriceHeadline>
          <PriceLabel>£{price}</PriceLabel>
          <RequestBtn
            onClick={this.handleClick}
            disabled={!this.state.noNights > 0}
          >
            Request Stay
          </RequestBtn>
        </PricingDiv>
      </div>
    );
  }
}
export default CalendarComponent;
