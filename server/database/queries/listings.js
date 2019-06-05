const Listing = require("./../models/Listing");

module.exports.createNewListing = data => Listing.create(data);
