const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const accountSchema = new Schema(
  {
    // the total value of the overall incomes
    income: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    // the total value of the money has been withdrew
    withdrawal: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    // the total value of the money has been donated
    donation: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    // the total values of the current coupons that the org created and didnt used yet
    couponsValue: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    // current balance in the account
    currentBalance: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Account = model('accounts', accountSchema);

module.exports = Account;
