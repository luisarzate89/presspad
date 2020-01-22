const getOldBookings = require("./../../../database/queries/bookings/getOldBookings");
const Booking = require("../../../database/models/Booking");

module.exports = async () => {
  const oldBookings = await getOldBookings();

  if (!oldBookings.length) return null;

  const oldBookingsIds = oldBookings.map(booking => booking._id);

  return Booking.updateMany(
    { _id: { $in: oldBookingsIds } },
    {
      status: "canceled",
      canceledBy: null,
    },
  );
};
