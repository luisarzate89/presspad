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
  // look up spent credits
  {
    $lookup: {
      from: "transactions",
      localField: "_id",
      foreignField: "sender",
      as: "spendingTransactions",
    },
  },
  {
    $project: {
      _id: 1,
      name: 1,
      credits: 1,
      // get any bookings that cover today's date
      liveBookings: {
        $size: {
          $filter: {
            input: "$bookings",
            as: "booking",
            cond: {
              $and: [
                { $lte: ["$$booking.startDate", new Date()] },
                { $gte: ["$$booking.endDate", new Date()] },
              ],
            },
          },
        },
      },
      // get any pending bookings in the future
      pendingBookings: {
        $size: {
          $filter: {
            input: "$bookings",
            as: "booking",
            cond: {
              $and: [
                { $gt: ["$$booking.startDate", new Date()] },
                { $eq: ["$$booking.status", "pending"] },
              ],
            },
          },
        },
      },
      // get any confirmed bookings in the future
      confirmedBookings: {
        $size: {
          $filter: {
            input: "$bookings",
            as: "booking",
            cond: {
              $and: [
                { $gt: ["$$booking.startDate", new Date()] },
                { $eq: ["$$booking.status", "confirmed"] },
              ],
            },
          },
        },
      },
    },
  },
]);
