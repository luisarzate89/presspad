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
    noDays: null,
    price: null
  };

  onChange = date => {
    const { price } = this.props;
    this.setState({
      date,
      noDays: this.countDays(date),
      price: this.countDays(date) * price
    });
  };

  countDays = date => {
    const start = moment(date[0]);
    const end = moment(date[1]);

    return end.diff(start, "days");
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

  // disables calendar tiles (days)
  tileDisabled = ({ date, view }) => {
    // create array of all days between avDateRanges
    const { availableDates } = this.props;
    const avDateRange = this.getAvailableDates(availableDates);

    //  return true if current date is not included in available dates => disable tile
    date = moment(date).format("YYYY-MM-DD");
    return (
      view === "month" && !avDateRange.includes(date) // Block day tiles only
    );
  };

  render() {
    console.log(this.state);
    const { price } = this.state;
    return (
      <div>
        <Calendar
          selectRange
          tileDisabled={this.tileDisabled}
          onChange={this.onChange}
          value={this.state.date}
          // onClick={this.updatePrice}
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
