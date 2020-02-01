const boom = require('boom');
// QUERIES
const {
  hostProfileData,
  getConfirmedBooking,
} = require('./../../database/queries/profile/hostProfile');

const generateUrl = require('../../helpers/generateFileURL');
const { isValidMongoObjectId } = require('../../helpers/isValidMongoObjectId');

// expect hostId as query param
// responds with data obj: user info, profile, listings, reviews
const getHostProfile = async (req, res, next) => {
  const { id: hostId } = req.params;
  const { id: userId, role } = req.user;

  if (!hostId) return next(boom.badRequest('User does not exist'));
  let address = {};

  try {
    if (!isValidMongoObjectId(hostId))
      return next(boom.notFound('Invalid Host ID'));

    let hostProfile;
    let booking;
    if (role === 'intern') {
      booking = await getConfirmedBooking(userId, hostId);
      if (booking) [hostProfile] = await hostProfileData(hostId, true);
      else {
        // TODO 1- generate address as text eg. Canada Water SE8 (no booking)
        [hostProfile] = await hostProfileData(hostId);
      }
    } else [hostProfile] = await hostProfileData(hostId);

    const {
      listing: { address: { postcode = '', city = '' } = {} } = {},
    } = hostProfile;

    address = {
      addressline1: '',
      addressline2: '',
      postcode: postcode.substring(0, postcode.length - 3),
      city,
    };

    hostProfile.listing.address = address;

    if (!hostProfile || !hostProfile.profile || !hostProfile.listing)
      return next(boom.notFound('Host has no profile or does not exist'));

    if (hostProfile.listing.photos)
      await Promise.all(hostProfile.listing.photos.map(generateUrl));

    await generateUrl(hostProfile.profile.profileImage);

    return res.json({ ...hostProfile, showFullData: !!booking });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = getHostProfile;
