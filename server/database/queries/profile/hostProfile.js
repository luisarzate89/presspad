const mongoose = require("mongoose");
const User = require("../../models/User");

module.exports.hostProfileData = userId => User.aggregate([
  // match user
  {
    $match: {
      _id: mongoose.Types.ObjectId(userId),
      role: "host",
    },
  },
  // lookup profile
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
            gender: 1,
            hometown: 1,
            school: 1,
            hostingReasonAnswer: 1,
            mentoringExperienceAnswer: 1,
            industryExperienceAnswer: 1,
            backgroundAnswer: 1,
            verified: 1, // not sure if we need this
            bio: 1,
            organisation: 1,
            jobTitle: 1,
            profileImage: 1,
            badge: 1,
          },
        },
      ],
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
    $unwind: {
      path: "$listing",
      preserveNullAndEmptyArrays: true,
    },
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
                  name: 1,
                  email: 1,
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
