// expect userID
// responds with data obj: user info, profile, reviews

const boom = require("boom");

// QUERIES
const { internProfileData } = require("./../../database/queries/profile/internProfile");

const { getUserReviews } = require("./../../database/queries/user/index");

module.exports = async (req, res, next) => {
  const { user: { _id: userId } } = req;

  // check if user id is in request
  if (!userId) {
    return next(boom.badRequest("error loading profile"));
  }
  const profileData = id => Promise.all([internProfileData(id), getUserReviews(id)]);

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
