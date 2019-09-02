const moment = require("moment");
const { errorLogger, errorLogDir } = require("../errorLogger");

/**
 * returns the date of one week/two weeks/ or three weeks from our current date.
 * @param {integer} numberOfWeeks number of weeks to add to current date.
 * @returns {date} date object representing the target date based on number of weeks.
 */

const getTargetDate = (numberOfWeeks) => {
  // input validation
  if (typeof numberOfWeeks !== "number") {
    const error = { error: "dateHelper error: number of weeks must be a number" };
    return errorLogger(error, errorLogDir, __dirname);
  }
  if (numberOfWeeks > 3 || numberOfWeeks < 1) {
    const error = { error: "dateHelper error: number of weeks must be an integer between 1 and 3" };
    return errorLogger(error, errorLogDir, __dirname);
  }

  // trims the curent date to only show the year, month and day.
  // allows us to perform the check from midnight to avoid including one more or one less day.
  const currentDate = moment().startOf("day").format("YYYY-MM-DD").toString(); // eg: 2019-08-22
  // returns the number of milliseconds in order to add the needed number of weeks for the check.
  const dateInMilliseconds = new Date(currentDate).getTime();
  const targetDate = new Date(dateInMilliseconds + (numberOfWeeks * 7 * 24 * 60 * 60 * 1000));

  return targetDate;
};

module.exports = getTargetDate;
