const boom = require("boom");

const dashboardQuery = require("../../database/queries/organisation/dashboard.js");
const generateFileURL = require("./../../helpers/generateFileURL");

module.exports = async (req, res, next) => {
  const { user } = req;
  const { role, organisation } = user;

  // check for user role
  if (role !== "organisation" || !organisation) {
    return next(boom.unauthorized());
  }

  try {
    const results = await dashboardQuery(organisation);
    const [orgDetails] = results;
    if (orgDetails && orgDetails[0] && orgDetails[0].logo) {
      await generateFileURL(orgDetails[0].logo);
    }
    return res.json(results);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
