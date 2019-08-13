const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const internalTransactionSchema = new Schema({
  // the user who made the transaction
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  // the account that transfered the money
  from: {
    type: Schema.Types.ObjectId,
    ref: "accounts",
    required: true,
  },
  // the account that the money transfered to
  to: {
    type: Schema.Types.ObjectId,
    ref: "accounts",
    required: true,
  },
  // money value
  amount: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const InternalTransaction = model("internalTransactions", internalTransactionSchema);

module.exports = InternalTransaction;
