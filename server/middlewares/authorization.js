const boom = require('boom');

module.exports = roles => (req, res, next) => {
  const { user = {} } = req;
  const { role } = user;
  if (!role) {
    return next(boom.unauthorized('no credentials'));
  }

  if (!roles.includes(role)) {
    return next(boom.forbidden('You have no permission'));
  }

  return next();
};
