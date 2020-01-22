const Booking = require("../../models/Booking");

const getOldBookings = () => Booking.find({
  $expr: {
    $and: {
      $lt: ["$startDate", new Date()],
      $eq: ["$status", "pending"],
    },
  },
});

module.exports = getOldBookings;
