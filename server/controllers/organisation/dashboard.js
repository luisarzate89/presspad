const boom = require("boom");

const dashboardQuery = require("../../database/queries/organisation/dashboard.js");

module.exports = (req, res, next) => {
  const { id } = req.params;
  dashboardQuery(id)
    .then(results => res.json(results))
    .catch(err => next(boom.badRequest(err)));
};
