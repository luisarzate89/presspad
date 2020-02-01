const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const transactionSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
    },
    credits: {
      type: Number,
      required: true,
    },
    // if organisation is sending the credits (to intern) we need to store this
    sendingOrganisation: {
      type: Schema.Types.ObjectId,
      ref: 'organisations',
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    // if organisation is receiving credits (refund or from admin) we need to store this
    receivingOrganisation: {
      type: Schema.Types.ObjectId,
      ref: 'organisations',
    },
    // host can either donate or accept => update recipient field accordingly
    activities: {
      type: String,
      enum: ['donated', 'accepted'],
    },
  },
  {
    timestamps: true,
  },
);

const Transaction = model('transactions', transactionSchema);

module.exports = Transaction;
