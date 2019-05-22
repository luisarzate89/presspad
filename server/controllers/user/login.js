// expect email and plain password
// respond with user info and create new token

const jwt = require("jsonwebtoken");
const boom = require("boom");
const { compare } = require("bcryptjs");

// CONSTANTS
const { tokenMaxAge } = require("./../../constants");

// QUERIES
const { findByEmail } = require("./../../database/queries/user");

module.exports = (req, res, next) => {
  const { email, password: plainPassword } = req.body;

  findByEmail(email).then((user) => {
    if (!user) {
      // no user found so return error
      return next(boom.unauthorized("Login failed. User does not exist"));
    }

    // validate password
    return compare(plainPassword, user.password)
      .then((matched) => {
        if (!matched) {
          return next(boom.unauthorized("Login failed. Email or password cannot be recognised"));
        }

        // data to send in response
        const userInfo = {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };

        // create token for 30 days
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: tokenMaxAge.string,
        });
        res.cookie("token", token, { maxAge: tokenMaxAge.number, httpOnly: true });

        // send user info in response
        return res.json(userInfo);
      })
      .catch(err => next(boom.badImplementation(err)));
  });
};
