const boom = require("boom");

const { getAllOrgs } = require("./../../database/queries/user/organisation");

module.exports = (req, res, next) => {
  getAllOrgs()
    .then(orgs => res.json(orgs))
    .catch(err => next(boom.badImplementation(err)));
};
