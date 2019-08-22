import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

/**
 * Create installments array
 * @param {number} netAmount the remaining amount that the intern has to pay
 * @param {Date} startDate booking starting date
 * @param {Date} endDate booking ending date
 * @returns {Array}
 */
export const createInstallments = (netAmount, startDate, endDate) => {
  // split payemnts amount
  const firstPay = Math.round((netAmount / 3) * 100, 2) / 100;
  const secondPay = Math.round(((netAmount - firstPay) / 2) * 100, 2) / 100;
  const thirdPay = netAmount - firstPay - secondPay;

  // split payments dueDate
  //Todo think more about this
  const firstDueDate = moment().isBefore(moment(startDate).subtract(7, "day"))
    ? moment(startDate).subtract(7, "day")
    : moment();
  const secondDueDate = moment(startDate).add(
    Math.round(moment(endDate).diff(startDate, "days") / 2),
    "day"
  );
  const thirdDueDate = endDate;
  // console.log(moment().isBefore(firstDueDate));

  return [
    { key: 1, dueDate: firstDueDate, amount: firstPay },
    { key: 2, dueDate: secondDueDate, amount: secondPay },
    { key: 3, dueDate: thirdDueDate, amount: thirdPay }
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
  couponEnd
}) => {
  const bookingRange = moment.range(moment(bookingStart), moment(bookingEnd));
  const couponRange = moment.range(moment(couponStart), moment(couponEnd));
  return bookingRange.intersect(couponRange);
};

/**
 * get the discount days giving the booking range and the coupon range
 * @param {Object} dates {bookingStart, bookingEnd, couponStart, couponEnd}
 */
export const getDiscountDays = dates => {
  const intersectRange = getIntersectRange(dates);

  if (!intersectRange) return { discountDays: 0 };

  // reset the time to 00:00 to calculate the start and the end day of the range
  intersectRange.start.startOf("day");

  const discountDays = intersectRange.diff("day") + 1;

  return { discountDays, discountRange: intersectRange };
};

/**
 * calculate the price giving range of dates
 * @param {import("moment-range").MomentRange} range
 */
export const calculatePrice = range => {
  if (!range) return 0;
  range.start.startOf("day");
  range.end.add(1, "day");
  const weeks = range.diff("weeks");
  const days = range.diff("days") % 7;
  return weeks * 150 + days * 20;
};
