const User = require("../../models/User");

module.exports.getAllInternStats = () => User.aggregate([
  // get all interns
  {
    $match: { role: "intern" },
  },
  // look up organisation for that intern
  {
    $lookup: {
      from: "organisations",
      localField: "organisation",
      foreignField: "_id",
      as: "organisation",
    },
  },
  {
    $lookup: {
      from: "bookings",
      let: { intern: "$_id" },
      pipeline: [
        {
          $match:
          {
            $expr:
            {
              $and: [
                { $eq: ["$$intern", "$intern"] },
              ],
            },
          },
        },
        {
          $lookup: {
            from: "installments",
            let: { bookingId: "$_id" },
            pipeline: [
              {
                $match:
                {
                  $expr:
                  {
                    $and: [
                      { $eq: ["$booking", "$$bookingId"] },
                      { $gte: ["$dueDate", new Date()] },
                    ],
                  },
                },
              },
              {
                $sort:
                {
                  dueDate: 1,
                },
              },
            ],
            as: "nextInstallment",
          },
        },
      ],
      as: "bookings",
    },
  },
  {
    $unwind: { path: "$bookings", preserveNullAndEmptyArrays: true },
  },

  {
    $unwind: { path: "$bookings.nextInstallment", preserveNullAndEmptyArrays: true },
  },
  {
    $addFields: {
      nextInstallment: "$bookings.nextInstallment",
    },
  }, {
    $project: {
      "bookings.nextInstallment": 0,
    },
  },
  {
    $sort:
     { "nextInstallment.dueDate": 1 },
  },

  {
    $group: {
      _id: {
        _id: "$_id",
        name: "$name",
        organisationName: { $arrayElemAt: ["$organisation.name", 0] },
      },
      bookings: { $push: "$bookings" },
      nextInstallment: { $first: "$nextInstallment" },
    },
  },

  {
    $project: {
      _id: "$_id._id",
      name: "$_id.name",
      organisationName: "$_id.organisationName",
      bookings: "$bookings",
      nextInstallment: "$nextInstallment",
    },
  },

  // look up spent credits
  {
    $lookup: {
      from: "accounts",
      localField: "account",
      foreignField: "_id",
      as: "account",
    },
  },
  {
    $addFields: {
      account: { $arrayElemAt: ["$account", 0] },
    },
  },
  {
    $project: {
      _id: 1,
      name: 1,
      organisationName: 1,
      nextInstallmentDueDate: "$nextInstallment.dueDate",
      nextInstallmentPaid: {
        $cond: [
          { $ifNull: ["$nextInstallment.transaction", false] },
          true,
          false,
        ],
      },
      nextInstallmentAmount: "$nextInstallment.amount",
      // get all the credits they've spent to date
      totalPayments: "$account.income",
      // get any bookings that cover today's date
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
]);
