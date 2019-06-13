const Organisation = require("../../models/Organisation");

module.exports.getAllClientStats = () => Organisation.aggregate([
  // get all users relevant to this organisation
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "organisation",
      as: "userDetails",
    },
  },
  {
    $unwind: "$userDetails",
  },
  // get the user who represents this organisation
  {
    $match: { "userDetails.role": "organisation" },
  },
  // get all users relevant to this organisation
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "organisation",
      as: "users",
    },
  },
  {
    $project: {
      _id: 1,
      name: 1,
      "userDetails._id": 1,
      "userDetails.email": 1,
      "userDetails.plan": 1,
      "userDetails.credits": 1,
      interns: {
        $filter: {
          input: "$users",
          as: "user",
          cond: { $eq: ["$$user.role", "intern"] },
        },
      },
    },
  },
  {
    $addFields: {
      numberOfInterns: { $size: "$interns" },
    },
  },
  {
    $lookup: {
      from: "transactions",
      localField: "userDetails._id",
      foreignField: "sender",
      as: "transactions",
    },
  },
  {
    $project: {
      _id: 1,
      name: 1,
      "userDetails._id": 1,
      "userDetails.email": 1,
      "userDetails.plan": 1,
      "userDetails.credits": 1,
      "interns.name": 1,
      numberOfInterns: 1,
      transactions: 1,
      // totalSpentCredits: 1,
    },
  },
]);
