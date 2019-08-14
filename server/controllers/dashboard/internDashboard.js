const boom = require("boom");

const { internDashboard: internDashboardQuery } = require("../../database/queries/dashboard");
const { getPublicFileUrl } = require("../../helpers/storage");
const { storageBucket: bucketName } = require("../../config");

/**
 * generate profileImage url
 * the function edits the reference directly
 * @private
 * @param {Array} profileRef
 */

const _getProfileImageUrl = (profileRef) => {
  const { profileImage } = profileRef;
  if (profileImage.fileName) {
    // eslint-disable-next-line no-param-reassign
    profileRef.profileImage = getPublicFileUrl(bucketName, profileImage.fileName);
  } else {
    // eslint-disable-next-line no-param-reassign
    profileRef.profileImage = "";
  }
};

const internDashboard = async (req, res, next) => {
  const { _id: internId, role } = req.user;

  if (role !== "intern") {
    return next(boom.forbidden());
  }
  try {
    const [dashboardData] = await internDashboardQuery(internId);
    const {
      profile,
      bookings,
    } = dashboardData;

    if (bookings[0]) {
      const [{ host: { profile: hostProfile } }] = bookings;
      _getProfileImageUrl(hostProfile);
    }

    if (profile) _getProfileImageUrl(profile);

    return res.json({ data: dashboardData });
  } catch (err) {
    return next(err);
  }
};

module.exports = internDashboard;
