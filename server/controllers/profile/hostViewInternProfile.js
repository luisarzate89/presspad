const boom = require("boom");
const mongoose = require("mongoose");

const generateUrl = require("../../helpers/generateFileURL");
const { internProfileData } = require("./../../database/queries/profile/internProfile");
const { getNextPendingBooking } = require("./../../database/queries/bookings");
const { getUserReviews } = require("./../../database/queries/user/index");


module.exports = async (req, res, next) => {
  try {
    const { id: internId } = req.params;
    const { role, id: hostId } = req.user;
    // check for role
    if (role !== "host" && role !== "superhost") {
      return next(boom.forbidden());
    }

    if (!mongoose.Types.ObjectId.isValid(internId)) {
      return next(boom.notFound());
    }

    // get intern's basic profile data
    const _profileData = internProfileData(internId);
    // get intern review
    const _internReviews = getUserReviews(internId);
    // get the intern-host most upcoming booking with status 'status = pending'
    const _nextPendingBooking = getNextPendingBooking({ internId, hostId });

    const [profileData, internReviews, nextPendingBooking] = await Promise.all(
      [_profileData, _internReviews, _nextPendingBooking],
    );

    if (profileData[0].profile && profileData[0].profile.profileImage) {
      await generateUrl(profileData[0].profile.profileImage);
    }

    return res.json({
      internData: profileData[0],
      reviews: internReviews,
      nextBooking: nextPendingBooking[0],
    });
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
