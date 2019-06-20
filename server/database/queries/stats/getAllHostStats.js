const User = require("../../models/User");

module.exports.getAllHostStats = () => User.aggregate([
  // get all hosts
  {
    $match: { role: "host" },
  },
  // look up listing for that user
  {
    $lookup: {
      from: "listings",
      localField: "_id",
      foreignField: "user",
      as: "listing",
    },
  },
  // look up profile for that user
  {
    $lookup: {
      from: "profiles",
      localField: "_id",
      foreignField: "user",
      as: "profile",
    },
  },
  {
    $unwind: "$listing",
  },
  {
    $lookup: {
      from: "bookings",
      localField: "listing._id",
      foreignField: "listing",
      as: "bookings",
    },
  },
  {
    $project: {
      _id: 1,
      name: 1,
      "listing.address.city": 1,
      "profile.verified": 1,
      // look up from bookings:
      // // any that were confirmed
      // // any that started before today's date
      internsHosted: {
        $size: {
          $filter: {
            input: "$bookings",
            as: "booking",
            cond: {
              $and: [
                { $lte: ["$$booking.startDate", new Date()] },
                { $eq: ["$$booking.status", "confirmed"] },
              ],
            },
          },
        },
      },
    },
  },
]);
