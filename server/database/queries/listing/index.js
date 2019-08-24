const Listing = require("../../models/Listing");

const updateListing = (userId, data, s) => Listing
  .updateOne({ user: userId }, data, { omitUndefined: true, session: s });

module.exports = { updateListing };
