const mongoose = require("mongoose");
const Booking = require("../../models/Booking");

const getHostNextPendingBooking = hostId => Booking.aggregate([
  {
    $match:
     {
       host: mongoose.Types.ObjectId(hostId),
       status: "pending",
       startDate: { $gte: new Date() },
     },
  },
  {
    $sort: {
      startDate: 1,
    },
  },
]);

module.exports = getHostNextPendingBooking;
