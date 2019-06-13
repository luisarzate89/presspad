const User = require("../../models/User");

module.exports.getAllInternStats = () => User.aggregate([
  // get all interns relevant to this organisation
  {
    $match: { role: "intern" },
  },
  // look up organisation for that intern
  {
    $lookup: {
      from: "organisations",
      localField: "organisation",
      foreignField: "_id",
      as: "organisation",
    },
  },
  // look up bookings for that user
  {
    $lookup: {
      from: "bookings",
      localField: "_id",
      foreignField: "user",
      as: "bookings",
    },
  },
  {
    $project: {
      _id: 1,
      name: 1,
      credits: 1,
      liveBookings: {
        $filter: {
          input: "$bookings",
          as: "booking",
          cond: { $gte: ["$booking.startDate", Date.now()] },
        },
      },
    },
  },
]);
