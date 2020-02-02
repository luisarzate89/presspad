const boom = require('boom');

const { getHostNextBooking } = require('./../../database/queries/bookings');

const {
  hostDashboard: hostDashboardQuery,
} = require('../../database/queries/dashboard');
const generateFileURL = require('./../../helpers/generateFileURL');

const hostDashboard = async (req, res, next) => {
  const { _id: hostId, role } = req.user;

  if (role !== 'host' && role !== 'superhost') {
    return next(boom.forbidden());
  }
  try {
    const [[dashboardData], [nextBooking]] = await Promise.all([
      // get full host dashboard data
      hostDashboardQuery(hostId),
      // get the next booking
      getHostNextBooking(hostId),
    ]);

    let nextBookingWithDetails;

    const { profile, bookings, withdrawRequests } = dashboardData;

    const requestedAmount = withdrawRequests
      .filter(request => request && request.status === 'pending')
      .reduce((prev, cur) => {
        return prev + cur.amount;
      }, 0);

    // console.log({ withdrawRequests });
    if (nextBooking && nextBooking._id && bookings && bookings.length) {
      // get the next booking details
      nextBookingWithDetails = bookings.find(
        _item => _item._id.toString() === nextBooking._id.toString(),
      );

      if (nextBookingWithDetails) {
        const {
          intern: { profile: internProfile },
        } = nextBookingWithDetails;
        if (internProfile && internProfile.profileImage) {
          // get intern's profile image of next booking
          generateFileURL(internProfile.profileImage);
        }
      }
    }

    if (profile && profile.profileImage) generateFileURL(profile.profileImage);

    return res.json({
      ...dashboardData,
      nextBookingWithDetails,
      requestedAmount: Number(Number(requestedAmount).toFixed(2)),
    });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = hostDashboard;
