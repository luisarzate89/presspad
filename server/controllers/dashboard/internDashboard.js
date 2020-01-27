const boom = require("boom");

const {
  internDashboard: internDashboardQuery,
} = require("../../database/queries/dashboard");
const generateFileURL = require("./../../helpers/generateFileURL");

const { getInternNextBooking } = require("./../../database/queries/bookings");

const internDashboard = async (req, res, next) => {
  const { _id: internId, role } = req.user;

  if (role !== "intern") {
    return next(boom.forbidden());
  }
  try {
    const [[dashboardData], [nextBooking]] = await Promise.all([
      internDashboardQuery(internId),
      // get the next booking
      getInternNextBooking(internId),
    ]);
    const { profile, bookings } = dashboardData;

    let nextBookingWithDetails;

    if (nextBooking && nextBooking._id && bookings && bookings.length) {
      // get the next booking details
      nextBookingWithDetails = bookings.find(
        _item => _item._id.toString() === nextBooking._id.toString(),
      );

      if (nextBookingWithDetails) {
        const {
          host: { profile: hostProfile },
        } = nextBookingWithDetails;

        if (hostProfile && hostProfile.profileImage) {
          // get host's profile image of next booking
          generateFileURL(hostProfile.profileImage);
        }
      }
    }

    if (profile) generateFileURL(profile.profileImage);

    return res.json({ data: { ...dashboardData, nextBookingWithDetails } });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = internDashboard;
