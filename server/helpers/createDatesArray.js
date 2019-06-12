const moment = require("moment");

module.exports = (start, end) => {
  const avDatesArray = [];

  // get all available dates in range
  let currentDate = start;
  const stopDate = end;

  while (currentDate <= stopDate) {
    avDatesArray.push(moment(currentDate).format("YYYY-MM-DD"));
    currentDate = moment(currentDate).add(1, "days");
  }

  return avDatesArray;
};
