const boom = require("boom");

const { internDashboard: internDashboardQuery } = require("../../database/queries/dashboard");
const { getPublicFileUrl } = require("../../helpers/storage");
const { storageBucket: bucketName } = require("../../config");

const internDashboard = async (req, res, next) => {
  const { _id: internId, role } = req.user;
  if (role !== "intern") {
    return next(boom.forbidden());
  }
  try {
    const [dashboardData] = await internDashboardQuery(internId);
    const { profile: [{ profileImage }] } = dashboardData;
    if (profileImage.name) {
      dashboardData.profile = { profileImage: getPublicFileUrl(bucketName, profileImage.name) };
    } else {
      dashboardData.profile = {};
    }
    return res.json({ data: dashboardData });
  } catch (err) {
    return next(err);
  }
};

module.exports = internDashboard;
