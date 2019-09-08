const mongoose = require("mongoose");
const Booking = require("../../models/Booking");

const getHostNextBooking = hostId => Booking.aggregate([
  {
    $match:
     {
       host: mongoose.Types.ObjectId(hostId),
       status: { $in: ["pending", "confirmed"] },
       startDate: { $gte: new Date() },
     },
  },
  {
    $sort: {
      startDate: 1,
    },
  },
]);

module.exports = getHostNextBooking;
