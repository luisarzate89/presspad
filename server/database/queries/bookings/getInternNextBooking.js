const mongoose = require("mongoose");
const Booking = require("../../models/Booking");

const getInternNextBooking = internId =>
  Booking.aggregate([
    {
      $match: {
        intern: mongoose.Types.ObjectId(internId),
        status: { $in: ["pending", "confirmed", "completed"] },
        startDate: { $gte: new Date() },
      },
    },
    {
      $sort: {
        startDate: 1,
      },
    },
  ]);

module.exports = getInternNextBooking;
