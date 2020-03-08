// expect email and plain password
// respond with user info and create new token

const boom = require('boom');
const { compare } = require('bcryptjs');

// CONSTANTS
const { tokenMaxAge } = require('./../../constants');

// QUERIES
const { findByEmail } = require('./../../database/queries/user');
const createToken = require('./../../helpers/createToken');

module.exports = (req, res, next) => {
  const { email, password: plainPassword } = req.body;

  findByEmail(email).then(user => {
    if (!user) {
      req.sqreen.auth_track(false, { email });
      // no user found so return error
      return next(boom.unauthorized('Login failed. User does not exist'));
    }

    // validate password
    return compare(plainPassword, user.password)
      .then(matched => {
        if (!matched) {
          req.sqreen.auth_track(false, { email });
          return next(
            boom.unauthorized(
              'Login failed. Email or password cannot be recognised',
            ),
          );
        }

        // data to send in response
        const userInfo = {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };

        const token = createToken(user._id);
        res.cookie('token', token, {
          maxAge: tokenMaxAge.number,
          httpOnly: true,
        });

        req.sqreen.auth_track(true, { email });
        // send user info in response
        return res.json(userInfo);
      })
      .catch(err => next(boom.badImplementation(err)));
  });
};
