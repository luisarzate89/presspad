import React, { Component } from "react";
import moment from "moment";
import Calendar from "react-calendar/dist/entry.nostyle";
import { Spin } from "antd";
import PropTypes from "prop-types";

import { CalendarWrapper } from "./Calendar.style";

/**
 * Presentational calendar, no functionality
 *
 * @param {string} startDate
 * @param {string} endDate
 */
class CalendarComponent extends Component {
  state = {
    isLoading: true,
    dates: new Date(),
    noNights: null,
    bookingExists: false,
  };

  static getDerivedStateFromProps(props, state) {
    const { startDate, endDate } = props;
    if (startDate === state.startDate && endDate === state.endDate) {
      return null;
    }
    const dates = [
      moment(startDate)
        .startOf("day") // reset the time to 00:00:00
        .toDate(), // change it to Date object
      moment(endDate)
        .endOf("day")
        .toDate(),
    ];

    return { ...state, startDate, endDate, dates, isLoading: false };
  }

  // disables calendar tiles (days)
  tileDisabled = ({ date }) => {
    const { dates } = this.state;

    const yesterday = moment()
      .subtract(1, "days")
      .endOf("day")
      .toDate();

    if (date >= dates[0] && date <= dates[1] && date <= yesterday) {
      return true; // return true to disable the day
    }
  };

  render() {
    const { isLoading } = this.state;

    if (isLoading) return <Spin tip="Loading Profile" />;

    return (
      <div>
        <CalendarWrapper>
          <Calendar
            prev2Label={null}
            next2Label={null}
            tileDisabled={this.tileDisabled}
            value={this.state.dates}
            locale="en-t-jp"
            maxDetail="month"
            minDetail="month"
            pointerEvents="none"
            formatShortWeekday={(locale, value) =>
              ["S", "M", "T", "W", "T", "F", "S"][moment(value).day()]
            }
          />
        </CalendarWrapper>
      </div>
    );
  }
}

CalendarComponent.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

export default CalendarComponent;
