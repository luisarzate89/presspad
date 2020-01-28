const Listing = require("./../models/Listing");

module.exports.createNewListing = (data, s) => Listing.create([data], { session: s });
