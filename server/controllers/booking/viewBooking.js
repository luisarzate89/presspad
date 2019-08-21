const boom = require("boom");
const { Types: { ObjectId } } = require("mongoose");
const { getBookingById } = require("../../database/queries/bookings");
const generateFileUrl = require("../../helpers/generateFileURL");

module.exports = async (req, res, next) => {
  const { id: bookingId } = req.params;
  const userType = "intern"; // Todo make it dynamic
  try {
    if (!ObjectId.isValid(bookingId) || !ObjectId(bookingId) === bookingId) {
      return next(new Error("invalid ObjectId"));
    }
    const booking = await getBookingById(bookingId, userType).exec();
    if (!booking[0]) {
      return next(boom.notFound());
    }
    // generate url for all files
    const { listing: { photos, userProfile } } = booking[0];
    const waitingAsync = photos.map(photoRef => generateFileUrl(photoRef));
    waitingAsync.push(generateFileUrl(userProfile.profileImage));

    await Promise.all(waitingAsync);

    // genrate photoimageurl
    return res.json({ data: booking[0] });
  } catch (error) {
    return next(error);
  }
};
