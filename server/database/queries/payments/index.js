const { createInstallments } = require("./installments");
const { createExternalTransaction } = require("./externalTransactions");
const { createInternalTransaction } = require("./internalTransactions");

module.exports = { createInstallments, createExternalTransaction, createInternalTransaction };
