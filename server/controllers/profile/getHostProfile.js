const boom = require("boom");
// QUERIES
const { hostProfileData } = require("./../../database/queries/profile/hostProfile");

// expect hostId as query param
// responds with data obj: user info, profile, listings, reviews

const getHostProfile = async (req, res, next) => {
  const { id: hostId } = req.params;

  // check if user id is in request
  if (!hostId) {
    return next(boom.badRequest("error loading profile"));
  }

  try {
    const [hostProfile] = await hostProfileData(hostId);

    if (!hostProfile.profile) {
      return next(boom.notFound("Cannot find the profile you're looking for"));
    }
    return res.json(hostProfile);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = getHostProfile;
