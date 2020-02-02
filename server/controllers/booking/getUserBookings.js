const boom = require('boom');
const { getUserBookings } = require('../../database/queries/bookings');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  getUserBookings(id)
    .then(bookings => res.json(bookings))
    .catch(() => next(boom.badRequest('error getting user bookings')));
};
