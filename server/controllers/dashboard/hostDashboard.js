const boom = require("boom");

const { getHostNextPendingBooking } = require("./../../database/queries/bookings");

const { hostDashboard: hostDashboardQuery } = require("../../database/queries/dashboard");
const generateFileURL = require("./../../helpers/generateFileURL");

const hostDashboard = async (req, res, next) => {
  const { _id: hostId, role } = req.user;

  if (role !== "host" && role !== "superhost") {
    return next(boom.forbidden());
  }
  try {
    const [[dashboardData], [nextBooking]] = await Promise.all([
      // get full host dashboard data
      hostDashboardQuery(hostId),
      // get the next booking
      getHostNextPendingBooking(hostId),
    ]);

    let nextBookingWithDetails;

    const {
      profile,
      bookings,
    } = dashboardData;

    if (nextBooking && nextBooking._id && bookings && bookings.length) {
      // get the next booking details
      nextBookingWithDetails = bookings.find(
        _item => _item._id.toString() === nextBooking._id.toString(),
      );

      if (nextBookingWithDetails) {
        const { intern: { profile: internProfile } } = nextBookingWithDetails;
        if (internProfile && internProfile.profileImage) {
          // get profile image of next booking intern
          generateFileURL(internProfile.profileImage);
        }
      }
    }


    if (profile && profile.profileImage) generateFileURL(profile.profileImage);

    return res.json({ ...dashboardData, nextBookingWithDetails });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = hostDashboard;
