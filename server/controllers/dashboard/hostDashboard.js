const boom = require("boom");

const { hostDashboard: hostDashboardQuery } = require("../../database/queries/dashboard");
const generateFileURL = require("./../../helpers/generateFileURL");

const hostDashboard = async (req, res, next) => {
  const { _id: hostId, role } = req.user;

  if (role !== "host" && role !== "superhost") {
    return next(boom.forbidden());
  }
  try {
    const [dashboardData] = await hostDashboardQuery(hostId);
    const {
      profile,
      bookings,
    } = dashboardData;

    if (bookings[0]) {
      const [{ intern: { profile: { profileImage } } }] = bookings;
      generateFileURL(profileImage);
    }

    if (profile && profile.profileImage) generateFileURL(profile.profileImage);

    return res.json({ ...dashboardData });
  } catch (err) {
    return next(err);
  }
};

module.exports = hostDashboard;
