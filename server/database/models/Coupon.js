const mongoose = require('mongoose');
const shortid = require('shortid');
const moment = require('moment');

const { Schema, model } = mongoose;

const couponSchema = new Schema(
  {
    organisation: {
      type: Schema.Types.ObjectId,
      ref: 'organisations',
    },
    organisationAccount: {
      type: Schema.Types.ObjectId,
      ref: 'accounts',
    },
    intern: {
      type: Schema.Types.ObjectId,
      ref: 'users',
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
      ref: 'users',
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
        message: 'Days is not an integer value',
      },
    },
    usedDays: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: 'Used Days is not an integer value',
      },
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: value => moment().startOf('day') <= value,
        message: 'start date is in the past',
      },
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: value => moment().startOf('day') <= value,
        message: 'end date is in the past',
      },
    },
    // the amount of money been deducted from org account
    reservedAmount: {
      type: Number,
      min: 0,
      required: true,
    },
    // the amount of money been used by intern so far
    usedAmount: {
      type: Number,
      min: 0,
      default: 0,
      required: true,
      validate: {
        validator(usedAmount) {
          return usedAmount <= this.reservedAmount;
        },
        message: 'used amount exceeded the reserved amount',
      },
    },
    // coupon's transactions history
    transactions: [
      {
        _id: { type: Schema.ObjectId, auto: true },
        // the amount been paid in this transaction
        amount: {
          type: Number,
          min: 0,
          required: true,
        },
        usedDays: {
          type: Number,
          required: true,
          validate: {
            validator: Number.isInteger,
            message: 'Used Days is not an integer value',
          },
        },
        booking: {
          type: Schema.Types.ObjectId,
          ref: 'bookings',
        },
        transaction: {
          type: Schema.Types.ObjectId,
          ref: 'internalTransactions',
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Coupon = model('coupons', couponSchema);

module.exports = Coupon;
