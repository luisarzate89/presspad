const { verify } = require("jsonwebtoken");
const boom = require("boom");

const { getUserById } = require("../database/queries/user");

module.exports = (req, res, next) => {
  // get cookies from the request
  const { cookies } = req;

  // if no cookies or token then proceed as a user who's not logged in
  if (!cookies || !cookies.token) {
    return next();
  }

  // verify the token
  return verify(cookies.token, process.env.SECRET, (err, decoded) => {
    // if not valid then clear and proceed as a user who's not logged in
    if (err) {
      req.sqreen.auth_track(false);
      res.clearCookie("token");
      return next();
    }

    // get the user Id from token
    const { id } = decoded;
    return getUserById(id, true)
      .then(user => {
        // put the user info in the req to be accessed in the next middlewares
        req.sqreen.auth_track(true, { email: user.email });
        req.user = user;
        next();
      })
      .catch(error => next(boom.badImplementation(error)));
  });
};
