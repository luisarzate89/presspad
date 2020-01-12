const boom = require("boom");
const { Types: { ObjectId } } = require("mongoose");
const { getBookingById } = require("../../database/queries/bookings");
const generateFileUrl = require("../../helpers/generateFileURL");

const addLinksIntoQuestion = require("../../helpers/addLinksIntoQuestion");

module.exports = async (req, res, next) => {
  const { id: bookingId } = req.params;
  const { role: userType } = req.user;

  try {
    if (!ObjectId.isValid(bookingId) || !ObjectId(bookingId) === bookingId) {
      return next(boom.badData("invalid ObjectId"));
    }
    const [booking] = await getBookingById(bookingId, userType).exec();
    if (!booking) {
      return next(boom.notFound());
    }

    // embed the links into question object
    booking.checkList.forEach(({ question }) => {
      addLinksIntoQuestion(question);
    });


    // generate url for all files
    const { listing: { photos, userProfile } } = booking;
    const waitingAsync = photos.map(photoRef => generateFileUrl(photoRef));
    waitingAsync.push(generateFileUrl(userProfile.profileImage));

    await Promise.all(waitingAsync);

    // filter coupons
    booking.coupons = booking.coupons.filter((coupon) => {
      for (let i = 0; i < coupon.transactions.length; i += 1) {
        const transactionBooking = coupon.transactions[i].booking;

        if (transactionBooking.toString() === booking._id.toString()) {
          return true;
        }
      }
      return false;
    });
    return res.json({ data: booking });
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
