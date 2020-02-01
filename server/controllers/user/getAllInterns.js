const boom = require('boom');

const { getAllInterns } = require('./../../database/queries/user');

module.exports = (req, res, next) => {
  getAllInterns()
    .then(interns => res.json(interns))
    .catch(err => next(boom.badImplementation(err)));
};
