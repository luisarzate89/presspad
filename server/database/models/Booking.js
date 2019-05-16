const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const bookingSchema = new Schema({
  listing: {
    type: Schema.Types.ObjectId,
    ref: 'listings'
  },
  // intern that requests booking
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  startDate: Date,
  endDate: Date,
  // bookings need to be confirmed or canceled by host
  // tracking also canceled bookings might be a good idea ?
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled'],
    default: 'pending'
  }
});

const Booking = model('bookings', bookingSchema);

module.exports = Booking;
