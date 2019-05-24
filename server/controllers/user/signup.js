// sign up controller
// respond with user info and create new token

const boom = require("boom");
const jwt = require("jsonwebtoken");

// QUERIES
const { findByEmail, addNewUser } = require("./../../database/queries/user");
const {
  checkCode,
  deleteCode,
  getOrgByName,
} = require("./../../database/queries/user/organisation");

// CONSTANTS
const { tokenMaxAge } = require("./../../constants");

module.exports = (req, res, next) => {
  const { userInfo } = req.body;
  const { email, role } = userInfo;

  console.log("user", userInfo);
  // check if the email already exists
  findByEmail(email)
    .then((storedUser) => {
      if (storedUser) {
        return next(boom.conflict("Email already taken"));
      }

      // MORE CHECKS REQUIRED FOR INTERN
      if (role === "intern") {
        // get code from userInfo
        const { orgCode } = userInfo;
        // check code exists
        return checkCode(orgCode)
          .then((storedCode) => {
            // if code doesn't exist return error that code doesn't exist
            if (!storedCode) {
              return next(boom.notFound("Code has expired or does not exist"));
            }
            // if code exists add organisation to userInfo object
            userInfo.organisation = storedCode.organisation;
            console.log("CODE Passed");
            // add new user
            return addNewUser(userInfo)
              .then((user) => {
                const token = jwt.sign({ id: user._id }, process.env.SECRET, {
                  expiresIn: tokenMaxAge.string,
                });

                res.cookie("token", token, { maxAge: tokenMaxAge.number, httpOnly: true });

                // delete code and then send userInfo back to client
                return deleteCode(orgCode)
                  .then(() => {
                    // data to be sent in the response
                    const newUserInfo = {
                      id: user._id,
                      role: user.role,
                      email: user.email,
                      name: user.name,
                    };
                    return res.json(newUserInfo);
                  })
                  .catch(err => next(boom.badImpletemention(err)));
              })
              .catch(err => next(boom.badImplementation(err)));
          })
          .catch(err => next(boom.badImplementation(err)));
      }

      console.log("reached");
      // FOR HOST AND ORGANISATION
      return addNewUser(userInfo)
        .then((user) => {
          console.log("USER", user);
          const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: tokenMaxAge.string,
          });

          res.cookie("token", token, { maxAge: tokenMaxAge.number, httpOnly: true });

          const newUserInfo = {
            id: user._id,
            role: user.role,
            email: user.email,
            name: user.name,
          };

          return res.json(newUserInfo);
        })
        .catch(err => next(boom.badImplementation(err)));
    })
    .catch(err => next(boom.badImplementation(err)));
};
