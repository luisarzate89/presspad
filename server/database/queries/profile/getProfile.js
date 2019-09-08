const mongoose = require("mongoose");

const Profile = require("../../models/Profile");

const getProfile = id => Profile.findOne({ user: id });

const getProfileByRoleAndId = (id, role) => Profile.aggregate([
  { $match: { user: mongoose.Types.ObjectId(id) } },
  {
    $lookup: {
      from: "users",
      localField: "user",
      foreignField: "_id",
      as: "user",
    },
  },
  { $match: { "user.role": role } },
  {
    $project: {
      "user.password": 0, "user.email": 0, "user.organisation": 0, "user.account": 0, "user.role": 0,
    },
  },
]);

const getUserDataByProfileId = id => Profile.aggregate([
  {
    $match:
    { _id: mongoose.Types.ObjectId(id) },
  },
  {
    $lookup: {
      from: "users",
      localField: "user",
      foreignField: "_id",
      as: "user",
    },
  },
  {
    $project: {
      user: { $arrayElemAt: ["$user", 0] },
    },
  },
  {
    $replaceRoot: { newRoot: "$user" },
  },
  {
    $project: {
      password: 0,
    },
  },
]);

module.exports = { getProfile, getProfileByRoleAndId, getUserDataByProfileId };
