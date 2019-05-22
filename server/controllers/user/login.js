// expect email and plain password
// respond with user info and create new token

const jwt = require("jsonwebtoken");
const boom = require("boom");
const { compare } = require("bcryptjs");

// QUERIES
const { findByEmail } = require("./../../database/queries/user");

module.exports = (req, res, next) => {
  const { email, password: plainPassword } = req.body;

  findByEmail(email).then((user) => {
    if (!user) {
      // no user found so return error
      return next(boom.unauthorized("Login failed. Email or password cannot be recognised"));
    }

    return res.json(user);
  });
};
