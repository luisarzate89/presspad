const boom = require("boom");
const { getUserBookings } = require("../database/queries/bookings");

module.exports = async (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;

  getUserBookings(id)
    .then(bookings => res.json(bookings))
    .catch(err => next(boom.badRequest("error getting user bookings")));
};
