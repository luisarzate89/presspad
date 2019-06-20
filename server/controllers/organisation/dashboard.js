const boom = require("boom");

const dashboardQuery = require("../../database/queries/organisation/dashboard.js");
const { getUserOrg } = require("./../../database/queries/user/index");

module.exports = async (req, res, next) => {
  const { user } = req;
  const { role, _id } = user;

  // check for user role
  if (role !== "organisation") {
    return next(boom.unauthorized());
  }

  try {
    // get the organisation for that user
    const [organisation] = await getUserOrg(_id);
    if (!organisation) {
      return next(boom.notFound());
    }

    // get dashboard data, [org details, notifications, interns]
    const results = await dashboardQuery(organisation._id);
    return res.json(results);
  } catch (error) {
    return next(boom.badImplementation());
  }
};
