const mongoose = require("mongoose");
const User = require("../../models/User");

module.exports.internProfileData = userId => new Promise((resolve, reject) => {
  User.aggregate([
    // match user
    {
      $match: { _id: mongoose.Types.ObjectId(userId) },
    },
    {
      $project: {
        password: 0,
      },
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
    // lookup organisation
    {
      $lookup: {
        from: "organisations",
        localField: "organisation",
        foreignField: "_id",
        as: "organisation",
      },
    },
    {
      $addFields: {
        profile: { $arrayElemAt: ["$profile", 0] },
        organisation: { $arrayElemAt: ["$organisation", 0] },
      },
    },
  ])
    .then(response => resolve(response))
    .catch(error => reject(error));
});
