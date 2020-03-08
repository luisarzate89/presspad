import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

/**
 * Create installments array
 * @param {number} netAmount the remaining amount that the intern has to pay
 * @param {Date} startDate booking starting date
 * @param {Date} endDate booking ending date
 * @param {boolean} upfront true if pay upfront
 * @returns {Array}
 */
export const createInstallments = (netAmount, startDate, endDate, upfront) => {
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
export const getIntersectRange = ({
  bookingStart,
  bookingEnd,
  couponStart,
  couponEnd,
}) => {
  const bookingRange = moment.range(moment(bookingStart), moment(bookingEnd));
  const couponRange = moment.range(moment(couponStart), moment(couponEnd));
  return bookingRange.intersect(couponRange);
};

/**
 * get the discount days giving the booking range and the coupon range
 * discountDays = discountDays"from intersectRange" - usedDays.
 * discountRange have all range that intersect with the booking
 * @param {Object} dates {bookingStart, bookingEnd, couponStart, couponEnd, usedDays}
 */
export const getDiscountDays = dates => {
  const intersectRange = getIntersectRange(dates);

  if (!intersectRange) return { discountDays: 0 };

  // reset the time to 00:00 to calculate the start and the end day of the range
  intersectRange.start.startOf('day');

  const discountDays = intersectRange.diff('day') + 1;

  return { discountDays };
};

/**
 * calculate the price giving range of dates
 * @param {import("moment-range").MomentRange} range moment-range OR number
 */
export const calculatePrice = range => {
  if (!range) return 0;
  let weeks;
  let days;
  if (typeof range === 'number') {
    weeks = Math.trunc(range / 7);
    days = range % 7;
  } else {
    range.start.startOf('day');
    range.end.add(1, 'day');
    weeks = range.diff('weeks');
    days = range.diff('days') % 7;
  }
  return weeks * 15000 + days * 2000;
};

/**
 * get the first unpaid installment
 * @param {Array} installments
 */
export const getFirstUnpaidInstallment = installments => {
  if (!installments || !Array.isArray(installments) || !installments[0])
    return undefined;

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
