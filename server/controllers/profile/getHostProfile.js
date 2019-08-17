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
    await Promise.all(hostProfile.listing.photos.map(generateUrl));
    await generateUrl(hostProfile.profile.profileImage);

    if (!hostProfile.profile) {
      return next(boom.notFound("Cannot find the profile you're looking for"));
    }
    return res.json(hostProfile);
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = getHostProfile;
