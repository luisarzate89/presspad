const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const bookingSchema = new Schema(
  {
    intern: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    listing: {
      type: Schema.Types.ObjectId,
      ref: 'listings',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    confirmDate: {
      type: Date,
    },
    // bookings need to be confirmed or canceled by [host,intern,admin]
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'canceled', 'completed'],
      default: 'pending',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    payedAmount: {
      type: Number,
      default: 0,
    },
    // user's ID who canceled the booking
    canceledBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    // when intern pay to booking, where should money go
    moneyGoTo: {
      type: String,
      enum: ['presspad', 'host'],
      required: true,
      default: 'host',
    },
  },
  {
    timestamps: true,
  },
);

const Booking = model('bookings', bookingSchema);

module.exports = Booking;
