const boom = require('boom');
const {
  Types: { ObjectId },
} = require('mongoose');
const { getBooking } = require('../../database/queries/bookings');

module.exports = async (req, res, next) => {
  const { id: bookingId } = req.params;
  const { role: userType, id: userId } = req.user;

  if (!['host', 'intern'].includes(userType)) {
    return next(boom.forbidden());
  }

  try {
    if (!ObjectId.isValid(bookingId) || !ObjectId(bookingId) === bookingId) {
      return next(boom.badData('invalid ObjectId'));
    }

    const [booking] = await getBooking(bookingId).exec();

    if (!booking) {
      return next(boom.notFound());
    }

    if (userType === 'host' && booking.host._id.toString() !== userId) {
      return next(boom.forbidden());
    }
    if (userType === 'intern' && booking.intern._id.toString() !== userId) {
      return next(boom.forbidden());
    }

    return res.json({ data: booking });
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
