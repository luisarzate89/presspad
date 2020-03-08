const Moment = require('moment');
const { extendMoment } = require('moment-range');

const moment = extendMoment(Moment);

/**
 * Create installments array
 * @param {number} netAmount the remaining amount that the intern has to pay
 * @param {Date} startDate booking starting date
 * @param {Date} endDate booking ending date
 * @param {boolean} upfront true if pay upfront
 * @returns {Array}
 */
exports.createInstallments = (netAmount, startDate, endDate, upfront) => {
  if (upfront) {
    return {
      key: 1,
      dueDate: moment().isBefore(moment(startDate).subtract(7, 'day'))
        ? moment(startDate)
            .subtract(7, 'day')
            .toISOString()
        : moment().toISOString(),
      amount: netAmount,
    };
  }
  if (moment().isAfter(endDate)) return [];

  // split payemnts amount
  const firstPay = Math.floor(netAmount / 3);
  const secondPay = Math.floor((netAmount - firstPay) / 2);
  const thirdPay = netAmount - firstPay - secondPay;

  // split payments dueDate
  const firstDueDate = moment().isBefore(moment(startDate).subtract(7, 'day'))
    ? moment(startDate)
        .subtract(7, 'day')
        .toISOString()
    : moment().toISOString();
  const secondDueDate = moment(startDate)
    .add(Math.round(moment(endDate).diff(startDate, 'days') / 2), 'day')
    .toISOString();
  const thirdDueDate = endDate;

  return [
    { key: 1, dueDate: firstDueDate, amount: firstPay },
    { key: 2, dueDate: secondDueDate, amount: secondPay },
    { key: 3, dueDate: thirdDueDate, amount: thirdPay },
  ];
};

/**
 * get the intersection range between booking and coupon ranges
 * @param {Object} param0 {bookingStart, bookingEnd, couponStart, couponEnd}
 */
const getIntersectRange = ({
  bookingStart,
  bookingEnd,
  couponStart,
  couponEnd,
}) => {
  const bookingRange = moment.range(moment(bookingStart), moment(bookingEnd));
  const couponRange = moment.range(moment(couponStart), moment(couponEnd));
  return bookingRange.intersect(couponRange);
};

exports.getIntersectRange = getIntersectRange;

/**
 * get the discount days giving the booking range and the coupon range
 * @param {Object} dates {bookingStart, bookingEnd, couponStart, couponEnd}
 */
exports.getDiscountDays = dates => {
  const intersectRange = getIntersectRange(dates);

  if (!intersectRange) return { discountDays: 0 };

  // reset the time to 00:00 to calculate the start and the end day of the range
  intersectRange.start.startOf('day');

  const discountDays = intersectRange.diff('day') + 1;

  return { discountDays, discountRange: intersectRange };
};

/**
 * calculate the price giving range of dates
 * @param {import("moment-range").MomentRange} range moment range OR number
 */
exports.calculatePrice = range => {
  if (!range) return 0;
  let weeks;
  let days;
  if (typeof range === 'number') {
    weeks = Math.trunc(range / 7);
    days = range % 7;
  } else {
    range.start.startOf('day');
    range.end.add(1, 'day').endOf('day');
    weeks = range.diff('weeks');
    days = range.diff('days') % 7;
  }
  return weeks * 15000 + days * 2000;
};

/**
 * get the first unpaid installment
 * @param {Array} installments
 */
exports.getFirstUnpaidInstallment = installments => {
  if (!installments || !Array.isArray(installments) || !installments[0]) {
    return undefined;
  }

  let firstUnpaidInstallment;
  installments.forEach(installment => {
    if (!installment.transaction) {
      if (!firstUnpaidInstallment) {
        firstUnpaidInstallment = installment;
      } else {
        const { dueDate } = installment;
        const { dueDate: firstDueDate } = firstUnpaidInstallment;
        if (moment(dueDate).isBefore(firstDueDate)) {
          firstUnpaidInstallment = installment;
        }
      }
    }
  });
  return firstUnpaidInstallment;
};

/**
 * compare installments
 * @param {array, Object} oldInstallments array or object
 * @param {array, Object} newInstallments array or object
 * @returns boolean
 */
exports.compareInstallments = (oldInstallments, newInstallments) => {
  if (!Array.isArray(oldInstallments) && !Array.isArray(newInstallments)) {
    const { amount, dueDate } = newInstallments;
    const { amount: oldAmount, dueDate: oldDueDate } = oldInstallments;

    if (oldAmount !== amount) return false;
    if (
      !moment(dueDate)
        .startOf('day')
        .isSame(moment(oldDueDate).startOf('day'))
    )
      return false;

    return true;
  }
  return oldInstallments.reduce((acc, curr, i) => {
    const { amount, dueDate } = newInstallments[i];
    const { amount: oldAmount, dueDate: oldDueDate } = curr;

    if (oldAmount !== amount) return false;
    if (
      !moment(dueDate)
        .startOf('day')
        .isSame(moment(oldDueDate).startOf('day'))
    )
      return false;
    return acc;
  }, true);
};
