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
});
