const mongoose = require("mongoose");
const Booking = require("../../models/Booking");

const getNextPendingBooking = ({ internId, hostId }) => Booking.aggregate([
  {
    $match:
     {
       intern: mongoose.Types.ObjectId(internId),
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

module.exports = getNextPendingBooking;
