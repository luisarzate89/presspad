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
  const { email } = userInfo;

  // check if the email already exists
  findByEmail(email)
    .then((storedUser) => {
      if (storedUser) {
        return next(boom.conflict("Email already taken"));
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
