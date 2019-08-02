import moment from "moment";

export const createDatesArray = (start, end) => {
  const datesArray = [];

  // get all available dates in range
  let currentDate = new Date(start);
  const stopDate = new Date(end);

  while (currentDate <= stopDate) {
    datesArray.push(moment(currentDate).format("YYYY-MM-DD"));
    currentDate = moment(currentDate).add(1, "days");
  }

  return datesArray;
};
// creates array of all available dates for listing
export const getDateRangeFromArray = datesArray => {
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

/**
 * return the time in words eg. 5 minutes ago, few seconds ago
 * @param {Date} time moment time
 */
export const getStringTime = time => {
  return moment(time).fromNow();
};
