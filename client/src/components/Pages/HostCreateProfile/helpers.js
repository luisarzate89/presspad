import moment from "moment";

const MILLISECONDS_IN_A_DAY = 86400000;

/**
 * check if the date is disabled(return true) or not(return false)
 * return true if the {endDate} is match a reserved range or its before current date
 * @param {Number} index the index of range you are checking for
 * @param {Date} endValue the date value you are looking for {moment date}
 * @param {Array.<{startValue: Date, endValue: Date}>} availableDates array of ranges
 * @return {Boolean}
 */
export const disabledEndDate = (index, endValue, availableDates) => {
  const startValue = availableDates[index].startValue;

  // check for reserved dates
  const isDatePicked = checkIntersections(startValue, endValue, availableDates);

  if (isDatePicked) {
    return true;
  }

  // if the user didn't select the endValue nor startValue
  // then he can't select a date before the current date
  if (!endValue || !startValue) {
    return endValue && endValue < moment().endOf("day");
  }

  // if the user selected a start date or end date
  // then he can't select reverse range
  // the start date must be before the end date
  return (
    endValue.valueOf() <= startValue.valueOf() ||
    (endValue && endValue < moment().endOf("day"))
  );
};

/**
 * check if the date is disabled(return true) or not(return false)
 * return true if the {startValue} is match a reserved range or its before current date
 * @param {Number} index the index of range you are checking for
 * @param {Date} startValue the date value you are looking for {moment date}
 * @param {Array.<{startValue: Date, endValue: Date}>} availableDates array of ranges
 * @return {Boolean}
 */
export const disabledStartDate = (index, startValue, availableDates) => {
  const endValue = availableDates[index].endValue;

  // check for reserved dates
  const isDatePicked = checkIntersections(
    startValue,
    startValue,
    availableDates
  );

  if (isDatePicked) {
    return true;
  }

  // if the user didn't select the endValue nor startValue
  // then he can't select a date before the current date
  if (!startValue || !endValue) {
    return startValue && startValue < moment().subtract(1, "day");
  }

  // if the user selected a start date or end date
  // then he can't select reverse range
  // the start date must be before the end date
  return (
    startValue.valueOf() > endValue.valueOf() ||
    (startValue && startValue < moment().subtract(1, "day"))
  );
};

/**
 *  check if the date is already selectd in another range
 * @param {Date} startDate the startDate of the range we are looking for
 * @param {Date} compareDate the date we are looking for it can be the start date or end date
 * @param {Array.<{startValue: Date, endValue: Date}>} availableDates all the selected ranges
 * @return {Boolean}
 */

const checkIntersections = (startDate, compareDate, availableDates) => {
  // iterate through the ranges and check if the endValue is in between them or not
  // if  rangeStartValue < compareDate < rangeEndValue  return true
  // true means - disable this date -
  const isDatePicked = availableDates.reduce((prev, curr) => {
    const { startValue: rangeStartValue, endValue: rangeEndValue } = curr;

    if (
      startDate &&
      rangeStartValue &&
      rangeEndValue &&
      (compareDate.valueOf() >= rangeStartValue.valueOf() &&
        compareDate.valueOf() <=
          rangeEndValue.valueOf() + MILLISECONDS_IN_A_DAY)
    ) {
      return true;
    }

    return prev || false;
  }, false);
  return isDatePicked;
};

/**
 * check if the selected date does surround another range
 * @param {Date} startValue  range's the start date
 * @param {Date} endValue range's the end date
 * @param {Array.<{startValue: Date, endValue: Date}>} availableDates all the selected ranges
 * @return {Boolean}
 */
export const checkSelectedRange = (startValue, endValue, availableDates) => {
  const surroundAnotherRange = availableDates.reduce((prev, curr) => {
    const { startValue: rangeStartValue, endValue: rangeEndValue } = curr;

    if (
      endValue &&
      startValue &&
      rangeStartValue &&
      rangeEndValue &&
      (startValue.valueOf() <= rangeStartValue.valueOf() &&
        endValue.valueOf() > rangeEndValue.valueOf())
    ) {
      return true;
    }

    return prev || false;
  }, false);
  return surroundAnotherRange;
};
