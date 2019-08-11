const boom = require("boom");

const dashboardQuery = require("../../database/queries/organisation/dashboard.js");

module.exports = async (req, res, next) => {
  const { user } = req;
  const { role, organisation } = user;

  // check for user role
  if (role !== "organisation" || !organisation) {
    return next(boom.unauthorized());
  }

  try {
    const results = await dashboardQuery(organisation);
    return res.json(results);
  } catch (error) {
    return next(boom.badImplementation());
  }
};
