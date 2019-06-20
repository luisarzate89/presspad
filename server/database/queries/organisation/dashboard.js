const mongoose = require("mongoose");

const Organisation = require("./../../models/Organisation");

module.exports = (id) => {
  // Org details
  const details = Organisation.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(id) },
    },
  ]);

  // interns notifications
  const notifications = Organisation.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: "users",
        let: { orgId: "$_id" },
        pipeline: [
          {
            $match: { $expr: { $eq: ["$$orgId", "$organisation"] } },
          },
        ],
        as: "users",
      },
    },
    {
      $unwind: "$users",
    },
    { $replaceRoot: { newRoot: "$users" } },
    {
      $lookup: {
        from: "notifications",
        localField: "_id",
        foreignField: "user",
        as: "notifications",
      },
    },
    {
      $unwind: "$notifications",
    },
    {
      $lookup: {
        from: "users",
        localField: "notifications.secondParty",
        foreignField: "_id",
        as: "secondP",
      },
    },
    {
      $project: {
        secondParty: {
          _id: { $arrayElemAt: ["$secondP._id", 0] },
          name: { $arrayElemAt: ["$secondP.name", 0] },
          email: { $arrayElemAt: ["$secondP.email", 0] },
          role: { $arrayElemAt: ["$secondP.role", 0] },
          organisation: { $arrayElemAt: ["$secondP.organisation", 0] },
        },
        user: {
          _id: "_id",
          name: "name",
          email: "email",
          role: "role",
          organisation: "organisation",
        },
        new: "$notifications.new",
        newForOrg: "$notifications.newForOrg",
        type: "$notifications.user",
        private: "$notifications.private",
        createdAt: "$notifications.createdAt",
      },
    },
  ]);

  // interns details
  const interns = Organisation.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(id) },
    }, {
      $lookup: {
        from: "users",
        let: { orgId: "$_id" },
        pipeline: [
          {
            $match: { $expr: { $eq: ["$$orgId", "$organisation"] } },
          },
        ],
        as: "users",
      },
    }, {
      $unwind: "$users",
    },
    { $replaceRoot: { newRoot: "$users" } },
    {
      $lookup: {
        from: "transactions",
        localField: "_id",
        foreignField: "sender",
        as: "transactions",
      },
    }, {

      $lookup: {
        from: "bookings",
        localField: "_id",
        foreignField: "user",
        as: "bookings",
      },

    }, {
      $addFields: {
        spentCredits: { $sum: "$transactions.credits" },
        totalCredits: { $sum: [{ $sum: "$transactions.credits" }, "$credits"] },
        liveBookings: {
          $size: {
            $filter: {
              input: "$bookings",
              as: "booking",
              cond: {
                $and: [
                  { $lte: ["$$booking.startDate", new Date()] },
                  { $gte: ["$$booking.endDate", new Date()] },
                ],
              },
            },
          },
        },
        // get any pending bookings in the future
        pendingBookings: {
          $size: {
            $filter: {
              input: "$bookings",
              as: "booking",
              cond: {
                $and: [
                  { $gt: ["$$booking.startDate", new Date()] },
                  { $eq: ["$$booking.status", "pending"] },
                ],
              },
            },
          },
        },
        // get any confirmed bookings in the future
        confirmedBookings: {
          $size: {
            $filter: {
              input: "$bookings",
              as: "booking",
              cond: {
                $and: [
                  { $gt: ["$$booking.startDate", new Date()] },
                  { $eq: ["$$booking.status", "confirmed"] },
                ],
              },
            },
          },
        },
      },
    }, {
      $addFields: {
        status: {
          $cond: {
            if: { $gte: ["$liveBookings", 0] },
            then: "At host",
            else:
           {
             $cond: {
               if: { $gte: ["$pendingBookings", 0] },
               then: "Pending request",
               else:
            {
              $cond: {
                if: { $gte: ["$confirmedBookings", 0] },
                then: "Booking confirmed",
                else:
             "Looking for host",
              },
            },
             },
           },
          },
        },
      },
    },
  ]);

  return Promise.all([details, notifications, interns]);
};
