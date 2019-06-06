const mongoose = require("mongoose");
const User = require("../../models/User");
const Listing = require("../../models/Listing");

module.exports.searchProfiles = searchInfo => new Promise((resolve, reject) => {
  const { city, startDate, endDate } = searchInfo;

  // if only city get all listings that match that city
  if (!startDate && !endDate) {
    Listing.find({ "address.city": city })
      .then(listings => resolve(listings))
      .catch(error => reject(error));
  }

  // if only dates get all listing that match those dates
  else if (!city) {
    Listing.aggregate([
      // get any listings that have an end date later than today
      {
        $match: { "availableDates.endDate": { $gte: new Date() } },
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
        },
      },
      {
        $addFields: {
          totalDates: { $size: "$availableDates" },
        },
      },
      {
        $match: { totalDates: { $gt: 0 } },
      },
    ])
      .then(listings => resolve(listings))
      .catch(error => reject(error));
  }

  // otherwise find those that match city AND dates
  else {
    Listing.aggregate([
      // get any listings that match the city
      {
        $match: { "address.city": city },
      },
      // get any listings that have an end date later than today
      {
        $match: { "availableDates.endDate": { $gte: new Date() } },
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
        },
      },
      {
        $addFields: {
          totalDates: { $size: "$availableDates" },
        },
      },
      {
        $match: { totalDates: { $gt: 0 } },
      },
    ])
      .then(listings => resolve(listings))
      .catch(error => reject(error));
  }
});
