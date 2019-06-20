const boom = require("boom");

const dashboardQuery = require("../../database/queries/organisation/dashboard.js");

module.exports = (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  dashboardQuery(id)
    .then(listings => res.json(listings))
    .catch(err => next(boom.badRequest(err)));
};
