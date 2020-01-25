// expects start/end dates and/or hometown
// responds with list of relevant listings

const boom = require("boom");

// QUERIES
const {
  searchProfiles,
} = require("./../../database/queries/profile/searchProfiles");

module.exports = async (req, res, next) => {
  const { hometown, startDate, endDate } = req.body;

  searchProfiles({ hometown, startDate, endDate })
    .then(listings => res.json(listings))
    .catch(err => next(boom.badRequest(err)));
};
