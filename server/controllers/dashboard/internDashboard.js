const boom = require("boom");

const { internDashboard: internDashboardQuery } = require("../../database/queries/dashboard");

const internDashboard = async (req, res, next) => {
  const { _id: internId, role } = req.user;
  if (role !== "intern") {
    return next(boom.forbidden());
  }
  try {
    const dashboardData = await internDashboardQuery(internId);
    return res.json({ data: dashboardData });
  } catch (err) {
    return next(err);
  }
};

module.exports = internDashboard;
