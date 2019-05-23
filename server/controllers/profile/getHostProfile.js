// expect userID
// responds with data obj: user info, profile, listings, reviews

const boom = require("boom");

// QUERIES
const { hostProfileData } = require("./../../database/queries/profile/hostProfile");

module.exports = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return next(boom.badRequest("error loading profile"));
  }

  await hostProfileData(userId)
    .then(profileData => (profileData.length > 0
      ? res.json(profileData)
      : next(boom.notFound("Cannot find the profile you're looking for"))))
    .catch(() => next(boom.badRequest("error loading profile")));

  return hostProfileData;
};
