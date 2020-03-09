const jwt = require('jsonwebtoken');

// CONSTANTS
const { tokenMaxAge } = require('./../constants');

const createToken = userId => {
  // create token for 30 days
  const token = jwt.sign({ id: userId }, process.env.SECRET, {
    expiresIn: tokenMaxAge.string,
  });

  return token;
};

module.exports = createToken;
