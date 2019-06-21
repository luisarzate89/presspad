const mongoose = require("mongoose");
const User = require("../../models/User");
const Review = require("../../models/Review");

module.exports.hostProfileData = userId => new Promise((resolve, reject) => {
  User.aggregate([
    // match user
    {
      $match: { _id: mongoose.Types.ObjectId(userId) },
    },
    // lookup profile
    {
      $lookup: {
        from: "profiles",
        localField: "_id",
        foreignField: "user",
        as: "profile",
      },
    },
    {
      $unwind: "$profile",
    },
    // lookup listings
    {
      $lookup: {
        from: "listings",
        localField: "_id",
        foreignField: "user",
        as: "listing",
      },
    },
    {
      $unwind: "$listing",
    },
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        listing: 1,
        profile: 1,
      },
    },
  ])
    .then(response => resolve(response))
    .catch(error => reject(error));
});
