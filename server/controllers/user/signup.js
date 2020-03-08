// sign up controller
// respond with user info and create new token

const boom = require('boom');

// QUERIES
const { findByEmail, addNewUser } = require('./../../database/queries/user');

// CONSTANTS
const { tokenMaxAge } = require('./../../constants');

const createToken = require('./../../helpers/createToken');

module.exports = (req, res, next) => {
  const { email, name, password, role, organisation } = req.body;

  // check if the email already exists
  findByEmail(email)
    .then(storedUser => {
      if (storedUser) {
        return next(boom.conflict('Email already taken'));
      }

      // MORE CHECKS REQUIRED FOR INTERN
      if (role === 'intern') {
        // add new user
        return addNewUser({ email, name, password, role })
          .then(user => {
            const token = createToken(user._id);

            res.cookie('token', token, {
              maxAge: tokenMaxAge.number,
              httpOnly: true,
            });

            // data to be sent in the response
            const newUserInfo = {
              id: user._id,
              role: user.role,
              email: user.email,
              name: user.name,
            };

            req.sqreen.signup_track({ email: user.email });
            return res.json(newUserInfo);
          })
          .catch(err => next(boom.badImplementation(err)));
      }

      // FOR HOST AND ORGANISATION
      return addNewUser({ email, name, password, role, organisation })
        .then(user => {
          const token = createToken(user._id);

          res.cookie('token', token, {
            maxAge: tokenMaxAge.number,
            httpOnly: true,
          });

          const newUserInfo = {
            id: user._id,
            role: user.role,
            email: user.email,
            name: user.name,
          };

          req.sqreen.signup_track({ email: user.email });
          return res.json(newUserInfo);
        })
        .catch(err => next(boom.badImplementation(err)));
    })
    .catch(err => next(boom.badImplementation(err)));
};
