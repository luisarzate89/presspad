const { createInstallments, updatePaidInstallment } = require("./installments");
const { createExternalTransaction } = require("./externalTransactions");
const { createInternalTransaction } = require("./internalTransactions");

module.exports = {
  createInstallments, updatePaidInstallment, createExternalTransaction, createInternalTransaction,
};
