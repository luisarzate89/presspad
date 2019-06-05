import React, { Component } from "react";
import Calendar from "react-calendar/dist/entry.nostyle";
import "./Calendar.css";
import moment from "moment";

import {
  PricingDiv,
  PriceHeadline,
  PriceLabel,
  RequestBtn
} from "./Profile.style";

class CalendarComponent extends Component {
  state = {
    date: new Date(),
    price: this.props.price
  };

  onChange = date => {
    console.log(Array.isArray(date));

    // const startDate = moment(date[0]).format("YYYY-MM-DD");
    // const endDate = moment(date[1]).format("YYYY-MM-DD");

    this.setState({ date });
  };

  // creates array of all available dates for listing
  getAvailableDates = datesArray => {
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

  tileDisabled = ({ date, view }) => {
    // get availableDates
    const { availableDates } = this.props;
    date = moment(date).format("YYYY-MM-DD");

    // create array of all days between avDateRanges
    const avDateRange = this.getAvailableDates(availableDates);

    //  return true if current date is not included in available dates => disable tile

    return (
      view === "month" && !avDateRange.includes(date) // Block day tiles only
    );
  };

  render() {
    const { price } = this.state;
    return (
      <div>
        <Calendar
          selectRange
          tileDisabled={this.tileDisabled}
          onChange={this.onChange}
          value={this.state.date}
        />
        <PricingDiv>
          <PriceHeadline>Full price for period</PriceHeadline>
          <PriceLabel>£{price}</PriceLabel>
          <RequestBtn>Request Stay</RequestBtn>
        </PricingDiv>
      </div>
    );
  }
}
export default CalendarComponent;
