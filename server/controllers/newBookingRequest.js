const boom = require("boom");
const { getUserBookings, createNewBooking } = require("../database/queries/bookings");

module.exports = async (req, res, next) => {
  const {
    listing, user, startDate, endDate, payment,
  } = req.body;

  try {
    await getUserBookings(user).then(res => console.log(res));
    // console.log(userBookings);
    // res.json({ success: true });
  } catch (error) {
    next(boom.badImplementation());
  }
};
