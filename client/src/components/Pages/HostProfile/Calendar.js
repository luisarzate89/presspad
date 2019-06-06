import React, { Component } from "react";
import Calendar from "react-calendar/dist/entry.nostyle";
import moment from "moment";

import {
  CalendarWrapper,
  PricingDiv,
  PriceHeadline,
  PriceLabel,
  RequestBtn
} from "./Calendar.style";

class CalendarComponent extends Component {
  state = {
    dates: new Date(),
    noNights: null,
    price: 0
  };

  onChange = dates => {
    const { price } = this.props;
    this.setState({
      dates,
      noNights: this.countDays(dates),
      price: this.countDays(dates) * price
    });
  };

  countDays = dates => {
    const start = moment(dates[0]);
    const end = moment(dates[1]);

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
          <RequestBtn>Request Stay</RequestBtn>
        </PricingDiv>
      </div>
    );
  }
}
export default CalendarComponent;
