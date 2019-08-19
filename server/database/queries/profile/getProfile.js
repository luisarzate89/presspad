const mongoose = require("mongoose");

const Profile = require("../../models/Profile");

const getProfile = id => Profile.findOne({ user: id });

const getProfileByRoleAndId = (id, role) => Profile.aggregate([
  { $match: { user: mongoose.Types.ObjectId("5d5ab1d470bc683624f3e6f0") } },
  {
    $lookup: {
      from: "users",
      localField: "user",
      foreignField: "_id",
      as: "user",
    },
  },
  { $match: { "user.role": role } },
  { $project: { "user.name": 1 } },
]);


module.exports = { getProfile, getProfileByRoleAndId };
