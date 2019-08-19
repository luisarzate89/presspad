const boom = require("boom");
// QUERIES
const { hostProfileData } = require("./../../database/queries/profile/hostProfile");

const generateUrl = require("../../helpers/generateFileURL");

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
    if (!hostProfile && !hostProfile.profile) {
      return next(boom.notFound());
    }

    await Promise.all(hostProfile.listing.photos.map(generateUrl));
    await generateUrl(hostProfile.profile.profileImage);

    return res.json(hostProfile);
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = getHostProfile;
