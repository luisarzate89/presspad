// sign up controller
// respond with user info and create new token

const boom = require("boom");
const jwt = require("jsonwebtoken");

// QUERIES
const { findByEmail, addNewUser } = require("./../../database/queries/user");
const { checkCode, deleteCode } = require("./../../database/queries/user/organisation");

// CONSTANTS
const { tokenMaxAge } = require("./../../constants");

module.exports = (req, res, next) => {
  const { userInfo } = req.body;
  const { email, role } = userInfo;

  // check if the email already exists
  findByEmail(email)
    .then((storedUser) => {
      if (storedUser) {
        return next(boom.conflict("Email already taken"));
      }

      // different actions then based on user role

      if (role === "intern") {
        // check code exists
        // if code doesn't exist return error that code doesn't exist
        // if code exists add organisation to userInfo object
        // add new user
        // delete code
      }

      return addNewUser(userInfo)
        .then((user) => {
          const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: tokenMaxAge.string,
          });

          res.cookie("token", token, { maxAge: tokenMaxAge.number, httpOnly: true });

          return res.json(userInfo);
        })
        .catch(err => next(boom.badImplementation(err)));
    })
    .catch(err => next(boom.badImplementation(err)));
};
