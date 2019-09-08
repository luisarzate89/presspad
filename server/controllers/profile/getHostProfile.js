const boom = require("boom");
// QUERIES
const { hostProfileData } = require("./../../database/queries/profile/hostProfile");

const generateUrl = require("../../helpers/generateFileURL");
const { isValidMongoObjectId } = require("../../helpers/isValidMongoObjectId");

// expect hostId as query param
// responds with data obj: user info, profile, listings, reviews
const getHostProfile = async (req, res, next) => {
  const { id: hostId } = req.params;

  if (!hostId) {
    return next(boom.badRequest("error loading profile"));
  }

  try {
    if (!isValidMongoObjectId(hostId)) {
      return next(boom.notFound("user does not exist"));
    }

    const [hostProfile] = await hostProfileData(hostId);

    if (!hostProfile || !hostProfile.profile || !hostProfile.listing) {
      return next(boom.notFound("User has no profile"));
    }

    if (hostProfile.listing.photos) {
      await Promise.all(hostProfile.listing.photos.map(generateUrl));
    }
    await generateUrl(hostProfile.profile.profileImage);

    return res.json(hostProfile);
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = getHostProfile;
