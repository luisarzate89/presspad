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
export const getStringTime = time => moment(time).fromNow();

/**
 * calculate the price giving range of dates
 * @param {import("moment-range").MomentRange} range
 */
export const calculatePrice = range => {
  if (!range) return 0;
  let weeks;
  let days;
  if (typeof range === "number") {
    weeks = Math.trunc(range / 7);
    days = range % 7;
  } else {
    range.start.startOf("day");
    range.end.add(1, "day");
    weeks = range.diff("weeks");
    days = range.diff("days") % 7;
  }
  return weeks * 150 + days * 20;
};

// fields to filter based on them
const filterFields = {
  // common
  name: 1,
  status: 1,
  totalPayments: 1,
  currentBalance: 1,

  // clients
  numberOfInterns: 1,
  currentlyHosted: 1,

  // interns
  organisation: 1,
  nextInstallmentAmount: 1,
  nextInstallmentDueDate: 1,

  // hosts
  city: 1,
  hosted: 1,
  totalIncome: 1,
  approvalStatus: 1,

  // payments
  user: 1,
  amount: 1,
  bankName: 1,
  accountNumber: 1,
  bankSortCode: 1,
};

/**
 * search an object and return boalean based on searchVal
 * @private
 * @param {object} obj
 * @param {string} searchVal
 * @returns {boolean}
 */
const _filterObj = (obj, searchVal) =>
  Object.keys(obj).some(key => {
    const _val = obj[key];
    if (typeof _val === "object") {
      return _filterObj(_val, searchVal);
    }
    if (filterFields[key]) {
      return _val
        .toString()
        .toLowerCase()
        .includes(searchVal.toLowerCase());
    }
    return false;
  });

/**
 * search an Array based on searchVal and return new filtered array
 * @private
 * @param {Array} arr
 * @param {string} searchVal
 * @returns {Array}
 */
const _filterArray = (arr, searchVal) =>
  arr.filter(item => {
    if (Array.isArray(item)) {
      return _filterArray(item, searchVal);
    }
    return _filterObj(item, searchVal);
  });

/**
 * Filter an Array based on search value
 * @param {Array} array source array
 * @param {string} searchVal search value
 * @returns {Array}
 */
export const filterArray = (array, searchVal) => _filterArray(array, searchVal);

export const capitalizeFirstLetter = str =>
  str[0].toUpperCase() + str.substr(1, str.length).toLowerCase();

export const titleCase = str =>
  str
    .split(" ")
    .map(capitalizeFirstLetter)
    .join(" ");

export const wordLengthValidator = (length, field) => value => {
  if (value.split(" ").length <= length) {
    return value;
  }
  throw new Error(`${field} length must be less than or equal ${length} words`);
};
