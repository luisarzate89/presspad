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

module.exports.hostReviews = userId => new Promise((resolve, reject) => {
  Review.aggregate([
    // match user
    {
      $match: { to: mongoose.Types.ObjectId(userId) },
    },
    // lookup user
    {
      $lookup: {
        from: "users",
        localField: "from",
        foreignField: "_id",
        as: "from_user",
      },
    },
    {
      $unwind: "$from_user",
    },
    {
      $lookup: {
        from: "profiles",
        localField: "from",
        foreignField: "user",
        as: "from_profile",
      },
    },
    {
      $unwind: "$from_profile",
    },
    {
      $project: {
        _id: 0,
        "from_user.name": 1,
        "from_profile.jobTitle": 1,
        message: 1,
        createdAt: 1,
        rating: 1,
      },
    },
  ])
    .then(response => resolve(response))
    .catch(error => reject(error));
});