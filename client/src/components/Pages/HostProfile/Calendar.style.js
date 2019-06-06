import styled from "styled-components";
import { colors, borders } from "./../../../theme";

const classNames = {
  reactCalendar: ".react-calendar",
  reactCalendarNavigation: ".react-calendar__navigation",
  reactCalendarMonthViewWeekdays: ".react-calendar__month-view__weekdays",
  reactCalendarMonthViewWeekdaysWeekday:
    ".react-calendar__month-view__weekdays__weekday",
  reactCalendarMonthViewWeekNumbers: ".react-calendar__month-view__weekNumbers",
  reactCalendarMonthViewDaysDay: ".react-calendar__month-view__days__day",
  reactCalendarMonthViewDaysDayWeekend:
    ".react-calendar__month-view__days__day--weekend",
  reactCalendarMonthViewDaysDayNeighboringMonth:
    ".react-calendar__month-view__days__day--neighboringMonth",
  reactCalendarYearView: ".react-calendar__year-view",
  reactCalendarDecadeView: ".react-calendar__decade-view",
  reactCalendarCenturyView: ".react-calendar__century-view",
  reactCalendarTile: ".react-calendar__tile",
  reactCalendarTileHasActive: ".react-calendar__tile--hasActive",
  reactCalendarTileActive: ".react-calendar__tile--active",
  reactCalendarSelectRange: ".react-calendar--selectRange",
  reactCalendarTileHover: ".react-calendar__tile--hover"
};

export const CalendarWrapper = styled.div.attrs(classNames)`
  ${classNames.reactCalendar} {
    width: 350px;
    max-width: 100%;
    font-family: Roboto;
    line-height: 1.125em;
    *,
    *:before,
    *:after {
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    button {
      margin: 0;
      border: 0;
      outline: none;
    }
    button:enabled:hover {
      cursor: pointer;
    }
  }
  ${classNames.reactCalendarNavigation} {
    height: 44px;
    margin-bottom: 1em;


    button {
      min-width: 50px;
      background: none;
    }

    button:enabled:hover,
    button:enabled:focus {
      background-color: ${colors.grayWhite}
    }

    button[disabled] {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 1em;
    }
  }
  ${classNames.reactCalendarMonthViewWeekdays} {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1em;
    border-bottom: ${borders.lightDivider};

    :hover {
      cursor: pointer;
    }
  }

  ${classNames.reactCalendarMonthViewWeekdaysWeekday} {
    padding: 0.5em;
  }
  ${classNames.reactCalendarMonthViewWeekNumbers} {
    font-weight: bold;
  }

  ${classNames.reactCalendarMonthViewWeekNumbers}, ${
  classNames.reactCalendarTile
} {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    padding: calc(1em) calc(0.66666666666667em);
  }
  ${classNames.reactCalendarMonthViewDaysDay} {
    font-size: 1em;
  }
  ${classNames.reactCalendarMonthViewDaysDayWeekend} {
  }

  ${classNames.reactCalendarMonthViewDaysDayNeighboringMonth} {
    color: ${colors.lightGray};
  }
  ${classNames.reactCalendarYearView} ${classNames.reactCalendarTile},${
  classNames.reactCalendarDecadeView
} ${classNames.reactCalendarTile},${classNames.reactCalendarCenturyView} ${
  classNames.reactCalendarTile
} {
    padding: 2em 0.5em;
  }
  ${classNames.reactCalendarTile} {
    max-width: 100%;
    text-align: center;
    padding: 0.75em 0.5em;
    background: none;

    :disabled {
      background-color: ${colors.transGray};
      color: ${colors.white}
      opacity: 0.6;
    }

    :enabled:hover,
    :enabled:focus {
      background-color: ${colors.lightBlue};
      color: ${colors.white};
    }
  }

  ${classNames.reactCalendarTileHasActive} {
    background: ${colors.lightBlue};
    :enabled:hover,
    :enabled:focus {
      background: ${colors.lightBlue};
      color: ${colors.white};
    }
  }
  ${classNames.reactCalendarTileActive} {
    background: ${colors.lightBlue};
    color: ${colors.white};
    :enabled:hover,
    :enabled:focus {
      background: #0ac7e7;
    }
  }
  ${classNames.reactCalendarSelectRange} ${classNames.reactCalendarTileHover} {
    background-color: ${colors.lightBlue}
    color: ${colors.white};
  }

`;

export const PricingDiv = styled.div`
  width: 95%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  border-top: ${borders.lightDivider};
  height: 185px;
`;

export const PriceHeadline = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  line-height: 2;
  text-align: left;
  margin-top: 10px;
`;
export const PriceLabel = styled.h1`
  font-weight: bold;
  font-size: 2rem;
`;

export const RequestBtn = styled.button`
  background: ${colors.lightBlue}
  border-radius: 17.5px;
  font-size: 1rem;
  color: ${colors.white};
  border: none;
  padding: 0.5rem 5rem;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out,
  transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  :focus, :hover {
    transform: scale(1.1);
  }

`;
