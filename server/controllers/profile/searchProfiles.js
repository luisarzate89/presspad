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
    const { hometown, startDate, endDate } = req.body;

    const listings = await searchProfiles({ hometown, startDate, endDate });
    if (listings[0]) await Promise.all(listings[0].photos.map(generateUrl));

    res.json(listings);
  } catch (err) {
    next(boom.badRequest(err));
  }
};
