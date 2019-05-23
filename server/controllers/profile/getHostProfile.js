// expect userID
// responds with data obj: user info, profile, listings, reviews

const boom = require("boom");

// QUERIES
const { hostProfileData, hostReviews } = require("./../../database/queries/profile/hostProfile");

module.exports = async (req, res, next) => {
  const { userId } = req.body;
  // check if user id is in request
  if (!userId) {
    return next(boom.badRequest("error loading profile"));
  }
  const profileData = async id => Promise.all([hostProfileData(id), hostReviews(id)]);

  profileData(userId)
    .then(data => (data[0].length && data[1].length
      ? res.json(data)
      : next(boom.notFound("Cannot find the profile you're looking for"))))
    .catch(() => next(boom.badRequest("error loading profile")));
  return [];
};
