const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const externalTransactionSchema = new Schema({
  // the user who made the transaction
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  // the account that transfered the money
  account: {
    type: Schema.Types.ObjectId,
    ref: "accounts",
    required: true,
  },
  // money value
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["deposite", "withdraw"],
  },
  stripeInfo: Object,
}, {
  timestamps: true,
});

const ExternalTransaction = model("externalTransactions", externalTransactionSchema);

module.exports = ExternalTransaction;
