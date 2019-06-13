// expects start/end dates and/or city
// responds with list of relevant listings

const boom = require("boom");

// QUERIES
const { searchProfiles } = require("./../../database/queries/profile/searchProfiles");

module.exports = async (req, res, next) => {
  searchProfiles(req.body)
    .then(listings => res.json(listings))
    .catch(err => next(boom.badRequest(err)));
};
