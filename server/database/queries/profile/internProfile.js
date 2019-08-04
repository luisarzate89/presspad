const mongoose = require("mongoose");
const User = require("../../models/User");

module.exports.internProfileData = userId => new Promise((resolve, reject) => {
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
  ])
    .then(response => resolve(response))
    .catch(error => reject(error));
});
