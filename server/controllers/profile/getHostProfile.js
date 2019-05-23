// expect userID
// responds with data obj: user info, profile, listings, reviews

const boom = require("boom");

// QUERIES
const { hostProfileData } = require("./../../database/queries/profile/hostProfile");

module.exports = (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;

  hostProfileData(id)
    .then(profileData => res.json(profileData))
    .catch(() => next(boom.badRequest("error loading profile")));
};
