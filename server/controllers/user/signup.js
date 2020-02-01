// sign up controller
// respond with user info and create new token

const boom = require("boom");
const jwt = require("jsonwebtoken");

// QUERIES
const { findByEmail, addNewUser } = require("./../../database/queries/user");

// CONSTANTS
const { tokenMaxAge } = require("./../../constants");

module.exports = (req, res, next) => {
  const { userInfo } = req.body;
  const { email, role } = userInfo;

  // check if the email already exists
  findByEmail(email)
    .then(storedUser => {
      if (storedUser) {
        return next(boom.conflict("Email already taken"));
      }

      // MORE CHECKS REQUIRED FOR INTERN
      if (role === "intern") {
        // get code from userInfo

        // add new user
        return addNewUser(userInfo)
          .then(user => {
            const token = jwt.sign({ id: user._id }, process.env.SECRET, {
              expiresIn: tokenMaxAge.string,
            });

            res.cookie("token", token, {
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
      return addNewUser(userInfo)
        .then(user => {
          const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: tokenMaxAge.string,
          });

          res.cookie("token", token, {
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
