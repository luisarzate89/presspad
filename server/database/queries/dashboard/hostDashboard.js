const mongoose = require("mongoose");

const User = require("../../models/User");

/**
 * get host dashboard information
 * [ host bookings, notifications and account details ]
 * @param {string} id the Host Id
 * @returns {promise} not fully fledge
 */
const hostDashboard = id => User.aggregate([
  { $match: { _id: mongoose.Types.ObjectId(id) } },
  // Host profile
  {
    $lookup: {
      from: "profiles",
      let: { host: "$_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$$host", "$user"] } } },
      ],
      as: "profile",
    },
  },
  {
    $unwind: { path: "$profile", preserveNullAndEmptyArrays: true },
  },
  // host notification
  {
    $lookup: {
      from: "notifications",
      let: { host: "$_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$$host", "$user"] } } },
        // SecondParty name
        {
          $lookup: {
            from: "users",
            let: { secondParty: "$secondParty" },
            pipeline: [
              { $match: { $expr: { $eq: ["$$secondParty", "$_id"] } } },
              {
                $project: { name: 1 },
              },
            ],
            as: "secondParty",
          },
        },
        {
          $unwind: { path: "$secondParty", preserveNullAndEmptyArrays: true },
        },
      ],
      as: "notifications",
    },
  },

  // host bookings
  {
    $lookup: {
      from: "bookings",
      let: { host: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$$host", "$host"] },
                { $ne: ["$status", "canceled"] },
              ],
            },
          },
        },
        // intern name
        {
          $lookup: {
            from: "users",
            let: { intern: "$intern" },
            pipeline: [
              { $match: { $expr: { $eq: ["$$intern", "$_id"] } } },
              // host profile
              {
                $lookup: {
                  from: "profiles",
                  let: { intern: "$_id" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$$intern", "$user"] } } },
                  ],
                  as: "profile",
                },
              },
              {
                $unwind: { path: "$profile", preserveNullAndEmptyArrays: true },
              },

              {
                $project: {
                  password: 0,
                },
              },
            ],
            as: "intern",
          },
        },
        {
          $unwind: { path: "$intern", preserveNullAndEmptyArrays: true },
        },
      ],
      as: "bookings",
    },
  }, {
    $lookup: {
      from: "accounts",
      localField: "account",
      foreignField: "_id",
      as: "account",
    },
  },
  {
    $unwind: { path: "$account", preserveNullAndEmptyArrays: true },
  },
  {
    $project: {
      password: 0,
    },
  },
]);

module.exports = hostDashboard;
