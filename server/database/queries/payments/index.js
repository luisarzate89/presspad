const { createInstallments, updatePaidInstallment } = require("./installments");
const { createExternalTransaction } = require("./externalTransactions");
const { createInternalTransaction } = require("./internalTransactions");
const { updateCouponTransaction } = require("./couponTransactions");

module.exports = {
  createInstallments,
  updatePaidInstallment,
  createExternalTransaction,
  createInternalTransaction,
  updateCouponTransaction,
};
