// expects start/end dates and/or hometown
// responds with list of relevant listings

const boom = require("boom");
const generateUrl = require("../../helpers/generateFileURL");

// QUERIES
const {
  searchProfiles,
} = require("./../../database/queries/profile/searchProfiles");

module.exports = async (req, res, next) => {
  try {
    const { city, startDate, endDate } = req.body;

    const listings = await searchProfiles({ city, startDate, endDate });
    if (listings.length) {
      await Promise.all(
        listings.map(listing => generateUrl(listing.photos[0])),
      );
    }

    // get first 2-3 chars from postcode
    listings.forEach(({ address = {} }) => {
      // eslint-disable-next-line no-param-reassign
      address.postcode = address.postcode
        ? address.postcode.substring(0, address.postcode.length - 3)
        : "";
    });

    res.json(listings);
  } catch (err) {
    next(boom.badRequest(err));
  }
};
