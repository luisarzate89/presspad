const moment = require("moment");

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
