const mongoose = require("mongoose");
const User = require("../../models/User");
const Booking = require("../../models/Booking");
const Review = require("../../models/Review");

const { addOrg } = require("./organisation");
const { createNewAccount } = require("../account");

module.exports.findByEmail = email => User.findOne({ email: email.toLowerCase() });

module.exports.getUserById = (id, withoutPassword) => (withoutPassword
  ? User.findById(id, { password: 0 })
  : User.findById(id));

module.exports.addNewUser = async (userInfo) => {
  const {
    email, name, password, role,
  } = userInfo;

  const newAccount = await createNewAccount();

  if (role === "organisation") {
    const { organisation, logo } = userInfo;
    const newOrg = await addOrg(organisation, logo, newAccount._id);
    return User.create({
      email: email.toLowerCase(),
      name,
      password,
      role,
      organisation: newOrg,
      account: newAccount._id,
    });
  }

  if (role === "host") {
    const { referral } = userInfo;
    return User.create({
      email: email.toLowerCase(),
      name,
      password,
      role,
      referral,
      account: newAccount._id,
    });
  }
  // assume it's intern at this point
  return User.create({
    email: email.toLowerCase(),
    name,
    password,
    role,
    account: newAccount._id,
  });
};

module.exports.getInternStatus = internId => Booking.aggregate([
  // get all the bookings for that intern
  {
    $match: { intern: mongoose.Types.ObjectId(internId) },
  },
  //  get only bookings that haven't ended yet
  {
    $match: { endDate: { $gt: new Date() } },
  },
  // return all the bookings that are either at host, confirmed or pending
  {
    $project: {
      status: {
        $switch: {
          branches: [
            {
              case: {
                $and: [
                  { $lte: ["$startDate", new Date()] },
                  { $gte: ["$endDate", new Date()] },
                  { $eq: ["$status", "confirmed"] },
                ],
              },
              then: "At host",
            },
            {
              case: {
                $and: [{ $gt: ["$startDate", new Date()] }, { $eq: ["$status", "pending"] }],
              },
              then: "Pending request",
            },
            {
              case: {
                $and: [{ $gt: ["$startDate", new Date()] }, { $eq: ["$status", "confirmed"] }],
              },
              then: "Booking confirmed",
            },
          ],
          default: "Looking for host",
        },
      },
    },
  },
]);

module.exports.getUserReviews = userId => new Promise((resolve, reject) => {
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


module.exports.getUserOrg = userId => User.aggregate([
  {
    $match: {
      _id: mongoose.Types.ObjectId(userId),
    },
  }, {
    $lookup: {
      from: "organisations",
      localField: "organisation",
      foreignField: "_id",
      as: "organisation",
    },
  }, {
    $addFields: {
      organisation: {
        $arrayElemAt: ["$organisation", 0],
      },
    },
  },
  { $replaceRoot: { newRoot: "$organisation" } },
]);
