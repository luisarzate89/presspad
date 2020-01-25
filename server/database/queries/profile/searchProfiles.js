const Listing = require("../../models/Listing");

module.exports.searchProfiles = ({ hometown, startDate, endDate }) =>
  new Promise((resolve, reject) => {
    // if only hometown get all listings that match that hometown
    if (!startDate && !endDate) {
      Listing.aggregate([
        {
          $match: { hometown: new RegExp(hometown, "i") },
        },
        //  get the user id so we can link to the right profile
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $addFields: {
            userID: "$user._id",
          },
        },
        {
          $lookup: {
            from: "profiles",
            localField: "user._id",
            foreignField: "user",
            as: "profile",
          },
        },
        {
          $unwind: "$profile",
        },
        {
          $match: {
            "profile.verified": true,
          },
        },
        {
          $project: {
            address: 1,
            availableDates: 1,
            photos: 1,
            userID: 1,
          },
        },
      ])
        .then(listings => resolve(listings))
        .catch(error => reject(error));
    } else if (!hometown) {
      // if only dates get all listing that match those dates
      Listing.aggregate([
        // get any listings that have an end date later than today
        {
          $match: { "availableDates.endDate": { $gte: new Date() } },
        },
        //  get the user id so we can link to the right profile
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $addFields: {
            userID: "$user._id",
          },
        },
        {
          $lookup: {
            from: "profiles",
            localField: "user._id",
            foreignField: "user",
            as: "profile",
          },
        },
        {
          $unwind: "$profile",
        },
        {
          $match: {
            "profile.verified": true,
          },
        },
        //  filter the availableDates so only availableDate objects within the time range remain
        {
          $project: {
            availableDates: {
              $filter: {
                input: "$availableDates",
                as: "availableDate",
                cond: {
                  $and: [
                    { $gte: ["$$availableDate.endDate", new Date(startDate)] },
                    { $lte: ["$$availableDate.startDate", new Date(endDate)] },
                  ],
                },
              },
            },
            address: 1,
            photos: 1,
            userID: 1,
          },
        },
        {
          $addFields: {
            totalDates: { $size: "$availableDates" },
          },
        },
        // remove any listings that don't have any available dates within the range
        {
          $match: { totalDates: { $gt: 0 } },
        },
      ])
        .then(listings => resolve(listings))
        .catch(error => reject(error));
    } else {
      // otherwise find those that match hometown AND dates
      Listing.aggregate([
        // get any listings that match the hometown
        {
          $match: { hometown: new RegExp(hometown, "i") },
        },
        // get any listings that have an end date later than today
        {
          $match: { "availableDates.endDate": { $gte: new Date() } },
        },
        //  get the user id so we can link to the right profile
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $addFields: {
            userID: "$user._id",
          },
        },
        {
          $lookup: {
            from: "profiles",
            localField: "user._id",
            foreignField: "user",
            as: "profile",
          },
        },
        {
          $unwind: "$profile",
        },
        {
          $match: {
            "profile.verified": true,
          },
        },
        //  filter the availableDates so only availableDate objects within the time range remain
        {
          $project: {
            availableDates: {
              $filter: {
                input: "$availableDates",
                as: "availableDate",
                cond: {
                  $and: [
                    { $gte: ["$$availableDate.endDate", new Date(startDate)] },
                    { $lte: ["$$availableDate.startDate", new Date(endDate)] },
                  ],
                },
              },
            },
            address: 1,
            photos: 1,
            userID: 1,
          },
        },
        {
          $addFields: {
            totalDates: { $size: "$availableDates" },
          },
        },
        // remove any listings that don't have any available dates within the range
        {
          $match: { totalDates: { $gt: 0 } },
        },
      ])
        .then(listings => resolve(listings))
        .catch(error => reject(error));
    }
  });
