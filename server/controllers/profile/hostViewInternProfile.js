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
    console.log(hostId);
    // check for role
    if (role !== "host" && role !== "superhost") {
      return next(boom.forbidden());
    }
    // get intern's basic profile data

    console.log(1);
    const _profileData = internProfileData(internId);
    console.log(2);
    const _internReviews = getUserReviews(internId);

    console.log(3);
    // get the intern-host most upcoming booking with status 'status = pending'
    const _nextPendingBooking = getNextPendingBooking({ internId, hostId });
    console.log(4);

    const [profileData, internReviews, nextPendingBooking] = await Promise.all(
      [_profileData, _internReviews, _nextPendingBooking],
    );
    console.log(nextPendingBooking);
    return res.json({ profile: profileData, reviews: internReviews, booking: nextPendingBooking[0] });
  } catch (error) {
    console.log(error);
    return next(boom.badImplementation(error));
  }
};
