const mongoose = require("mongoose");

const Organisation = require("./../../models/Organisation");
const Coupon = require("./../../models/Coupon");

module.exports = (id) => {
  // Org details
  const details = Organisation.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(id) },
    }, {
      $lookup: {
        from: "accounts",
        localField: "account",
        foreignField: "_id",
        as: "account",
      },
    }, {
      $addFields: {
        account: { $arrayElemAt: ["$account", 0] },
      },
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
        let: { user: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$$user", "$user"] },
                  { $eq: ["$private", false] }],
              },
            },
          },
        ],
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
          _id: "$_id",
          name: "$name",
          email: "$email",
          role: "$role",
          organisation: "$organisation",
        },
        seen: "$notifications.seen",
        _id: "$notifications._id",
        seenForOrg: "$notifications.seenForOrg",
        type: "$notifications.type",
        private: "$notifications.private",
        createdAt: "$notifications.createdAt",
      },
    },
  ]);

  // coupons details
  const coupons = Coupon.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $eq: ["$organisation", mongoose.Types.ObjectId(id)] },
            // { $lte: ["$startDate", new Date()] },
            // { $gt: ["$endDate", new Date()] },
          ],
        },
      },
    }, {
      $lookup: {
        from: "users",
        localField: "intern",
        foreignField: "_id",
        as: "intern",
      },
    }, {
      $addFields: {
        intern: { $arrayElemAt: ["$intern", 0] },
      },
    },
    {
      $lookup: {
        from: "bookings",
        localField: "_id",
        foreignField: "user",
        as: "bookings",
      },
    },
    {
      $addFields: {
        key: "$_id",
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
    },
    {
      $addFields: {
        status: {
          $cond: {
            if: { $gt: ["$liveBookings", 0] },
            then: "At host",
            else:
           {
             $cond: {
               if: { $gt: ["$pendingBookings", 0] },
               then: "Pending request",
               else:
            {
              $cond: {
                if: { $gt: ["$confirmedBookings", 0] },
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
    {
      $project: {
        "intern.password": 0,
      },
    },
  ]);

  return Promise.all([details, notifications, coupons]);
};
