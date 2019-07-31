const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const bookingSchema = new Schema({
  listing: {
    type: Schema.Types.ObjectId,
    ref: "listings",
  },
  // intern that requests booking
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  // bookings need to be confirmed or canceled by host
  // tracking also canceled bookings might be a good idea ?
  status: {
    type: String,
    enum: ["pending", "confirmed", "canceled"],
    default: "pending",
    required: true,
  },
  payment: {
    type: Number,
    required: true,
  },
  payed: {
    type: Boolean,
    default: false,
  },
});

const Booking = model("bookings", bookingSchema);

module.exports = Booking;