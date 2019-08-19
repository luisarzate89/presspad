const mongoose = require("mongoose");
const User = require("../../models/User");

module.exports.hostProfileData = userId => User.aggregate([
  // match user
  {
    $match: { _id: mongoose.Types.ObjectId(userId), role: "host" },
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
    $unwind: {
      path: "$profile",
      preserveNullAndEmptyArrays: true,
    },
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
    $lookup: {
      from: "reviews",
      let: { user_id: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$to", "$$user_id"] },
          },
        },
        {
          $lookup: {
            from: "users",
            let: { from: "$from" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$from"] },
                },
              },
              {
                $project: {
                  name: 1, email: 1,
                },
              },
              {
                $lookup: {
                  from: "profiles",
                  let: { id: "$_id" },
                  pipeline: [
                    {
                      $match: {
                        $expr: { $eq: ["$user", "$$id"] },
                      },
                    },
                    {
                      $project: {
                        jobTitle: 1,
                      },
                    },
                  ],
                  as: "profile",
                },
              },
              {
                $addFields: {
                  profile: { $arrayElemAt: ["$profile", 0] },
                },
              },
            ],
            as: "from",
          },
        },
        {
          $addFields: {
            from: { $arrayElemAt: ["$from", 0] },
          },
        },
      ],
      as: "reviews",
    },
  },
  {
    $project: {
      name: 1,
      email: 1,
      listing: 1,
      profile: 1,
      reviews: 1,
    },
  },
]);
