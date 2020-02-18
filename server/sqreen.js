let Sqreen = {};

if (process.env.NODE_ENV !== 'production') {
  Sqreen.middleware = (req, res, next) => {
    req.sqreen = {};
    req.sqreen.auth_track = () => {};
    req.sqreen.signup_track = () => {};
    req.sqreen.identify = () => {};
    next();
  };
} else {
  // eslint-disable-next-line global-require
  Sqreen = require('sqreen');
}

module.exports = Sqreen;
