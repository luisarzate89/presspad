const mongoose = require("mongoose");
const shortid = require("shortid");

const { Schema, model } = mongoose;

const couponSchema = new Schema({
  organisation: {
    type: Schema.Types.ObjectId,
    ref: "organisations",
  },
  organisationAccount: {
    type: Schema.Types.ObjectId,
    ref: "accounts",
  },
  intern: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  internName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  // organisation's admin
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  // 50% => 50
  discountRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  code: {
    type: String,
    unique: true,
    required: true,
    default: shortid.generate,
  },
  days: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "Days is not an integer value",
    },
  },
  usedDays: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "Used Days is not an integer value",
    },
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: value => Date.now() < value,
      message: "expiration date is in the past",
    },
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: value => Date.now() < value,
      message: "end date is in the past",
    },
  },
  // coupon's transactions history
  transactions: [{
    _id: { type: Schema.ObjectId, auto: true },
    usedDays: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: "Used Days is not an integer value",
      },
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: "bookings",
    },
    transaction: {
      type: Schema.Types.ObjectId,
      ref: "internalTransactions",
    },
  }],
}, {
  timestamps: true,
});

const Coupon = model("coupons", couponSchema);

module.exports = Coupon;
