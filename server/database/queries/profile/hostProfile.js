const mongoose = require("mongoose");
const User = require("../../models/User");

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
    // lookup reviews about the host
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "to",
        as: "reviews",
      },
    },
  ])
    .then(response => resolve(response))
    .catch(error => reject(error));
});
