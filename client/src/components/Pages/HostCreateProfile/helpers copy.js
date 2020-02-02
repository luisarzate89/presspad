import moment from 'moment';

const MILLISECONDS_IN_A_DAY = 86400000;

/**
 * check if the date is disabled(return true) or not(return false)
 * return true if the {endDate} is match a reserved range or its before current date
 * @param {Number} index the index of range you are checking for
 * @param {Date} endDate the date value you are looking for {moment date}
 * @param {Array.<{startDate: Date, endDate: Date}>} availableDates array of ranges
 * @return {Boolean}
 */
export const disabledEndDate = (index, endDate, availableDates) => {
  const { startDate } = availableDates[index];

  // check for reserved dates
  const isDatePicked = checkIntersections(startDate, endDate, availableDates);

  if (isDatePicked) {
    return true;
  }

  // if the user didn't select the endDate nor startDate
  // then he can't select a date before the current date
  if (!endDate || !startDate) {
    return endDate && endDate < moment().endOf('day');
  }

  // if the user selected a start date or end date
  // then he can't select reverse range
  // the start date must be before the end date
  return (
    endDate.valueOf() <= startDate.valueOf() ||
    (endDate && endDate < moment().endOf('day'))
  );
};

/**
 * check if the date is disabled(return true) or not(return false)
 * return true if the {startDate} is match a reserved range or its before current date
 * @param {Number} index the index of range you are checking for
 * @param {Date} startDate the date value you are looking for {moment date}
 * @param {Array.<{startDate: Date, endDate: Date}>} availableDates array of ranges
 * @return {Boolean}
 */
export const disabledStartDate = (index, startDate, availableDates) => {
  const { endDate } = availableDates[index];

  // check for reserved dates
  const isDatePicked = checkIntersections(startDate, startDate, availableDates);

  if (isDatePicked) {
    return true;
  }

  // if the user didn't select the endDate nor startDate
  // then he can't select a date before the current date
  if (!startDate || !endDate) {
    return startDate && startDate < moment().subtract(1, 'day');
  }

  // if the user selected a start date or end date
  // then he can't select reverse range
  // the start date must be before the end date
  return (
    startDate.valueOf() > endDate.valueOf() ||
    (startDate && startDate < moment().subtract(1, 'day'))
  );
};

/**
 *  check if the date is already selectd in another range
 * @param {Date} startDate the startDate of the range we are looking for
 * @param {Date} compareDate the date we are looking for it can be the start date or end date
 * @param {Array.<{startDate: Date, endDate: Date}>} availableDates all the selected ranges
 * @return {Boolean}
 */

const checkIntersections = (startDate, compareDate, availableDates) => {
  // iterate through the ranges and check if the endDate is in between them or not
  // if  rangestartDate < compareDate < rangeendDate  return true
  // true means - disable this date -
  const isDatePicked = availableDates.reduce((prev, curr) => {
    const { startDate: rangestartDate, endDate: rangeendDate } = curr;

    if (
      startDate &&
      rangestartDate &&
      rangeendDate &&
      compareDate.valueOf() >= rangestartDate.valueOf() &&
      compareDate.valueOf() <= rangeendDate.valueOf() + MILLISECONDS_IN_A_DAY
    ) {
      return true;
    }

    return prev || false;
  }, false);
  return isDatePicked;
};

/**
 * check if the selected date does surround another range
 * @param {Date} startDate  range's the start date
 * @param {Date} endDate range's the end date
 * @param {Array.<{startDate: Date, endDate: Date}>} availableDates all the selected ranges
 * @return {Boolean}
 */
export const checkSelectedRange = (startDate, endDate, availableDates) => {
  const surroundAnotherRange = availableDates.reduce((prev, curr) => {
    const { startDate: rangestartDate, endDate: rangeendDate } = curr;

    if (
      endDate &&
      startDate &&
      rangestartDate &&
      rangeendDate &&
      startDate.valueOf() <= rangestartDate.valueOf() &&
      endDate.valueOf() > rangeendDate.valueOf()
    ) {
      return true;
    }

    return prev || false;
  }, false);
  return surroundAnotherRange;
};

export const getValidDAtes = availableDates => {
  const validDates = availableDates.reduce((prev, curr) => {
    const { startDate, endDate } = curr;

    if (startDate && endDate) {
      prev.push({
        startDate: moment(startDate).format(),
        endDate: moment(endDate).format(),
      });
    }

    return prev;
  }, []);
  return validDates;
};
