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
  const profileData = id => Promise.all([hostProfileData(id), hostReviews(id)]);

  return profileData(userId)
    .then((data) => {
      // if no profile data return 404
      if (!data[0].length) {
        return next(boom.notFound("Cannot find the profile you're looking for"));
      }
      return res.json(data);
    })
    .catch(() => next(boom.badRequest("error loading profile")));
};
