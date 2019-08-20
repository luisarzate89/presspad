const mongoose = require("mongoose");

const Booking = require("../../models/Booking");

/**
 * get Booking information by bookingId
 * @param {string} id the Booking Id
 * @returns {promise} (use .exec() to make it fully fledge)
 */
module.exports = (bookingId, userType) => Booking.aggregate([
  { $match: { _id: mongoose.Types.ObjectId(bookingId) } },
  // Listing Info
  {
    $lookup: {
      from: "listings",
      let: { listing: "$listing" },
      pipeline: [
        { $match: { $expr: { $eq: ["$$listing", "$_id"] } } },
        // Get host profile info
        {
          $lookup: {
            from: "profiles",
            let: { host: "$user" },
            pipeline: [
              { $match: { $expr: { $eq: ["$$host", "$user"] } } },
              {
                $project: { verification: 0, user: 0 },
              },
            ],
            as: "userProfile",
          },
        },
        {
          $project: { otherInfo: 0, description: 0, user: 0 },
        },
      ],
      as: "listing",
    },
  },
  {
    $unwind: {
      path: "$listing",
      preserveNullAndEmptyArrays: true,
    },
  },
  // Get checklist questions & answeres
  {
    $lookup: {
      from: "checklistanswers",
      let: {
        bookingId: "$_id",
        userId: userType === "intern" ? "$intern" : "$host",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$$bookingId", "$booking"] },
                { $eq: ["$$userId", "$user"] },
              ],
            },
          },
        },
        // get the question text
        {
          $lookup: {
            from: "checklistquestions",
            let: { questionId: "$question" },
            pipeline: [
              { $match: { $expr: { $eq: ["$$questionId", "$_id"] } } },
            ],
            as: "question",
          },
        },
      ],
      as: "checkList",
    },
  },
  // Get Installments
  {
    $lookup: {
      from: "installments",
      let: { internId: "$intern" },
      pipeline: [
        { $match: { $expr: { $eq: ["$$internId", "$intern"] } } },
      ],
      as: "installments",
    },
  },
]);
