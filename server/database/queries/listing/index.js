const Listing = require("../../models/Listing");

const updateListing = (userId, data, s) => Listing
  .updateOne({ user: userId }, data, { omitUndefined: true, session: s });

const getAllCities = () => Listing.aggregate([
  { $match: {} },
  { $addFields: { city: "$address.city" } },
  { $project: { city: 1, _id: 0 } },
]);

module.exports = { updateListing, getAllCities };
