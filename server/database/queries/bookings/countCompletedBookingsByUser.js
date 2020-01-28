const { Types } = require("mongoose");
const Booking = require("../../models/Booking");

module.exports = userId =>
  Booking.countDocuments({
    $expr: {
      $and: [
        {
          $or: [
            { $eq: ["$intern", Types.ObjectId(userId)] },
            { $eq: ["$host", Types.ObjectId(userId)] },
          ],
        },
        { $eq: ["$status", "completed"] },
      ],
    },
  });
