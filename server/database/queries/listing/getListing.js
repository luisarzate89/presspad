const Listing = require('../../models/Listing');

module.exports.getListing = id => Listing.findOne({ user: id });
