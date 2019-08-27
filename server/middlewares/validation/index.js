const {
  HOST_COMPLETE_PROFILE,
  INTERN_COMPLETE_PROFILE,
  DONATION_URL,
  WITHDRAW_REQUEST_URL,
} = require("../../../client/src/constants/apiRoutes");
const hostProfileSchema = require("./hostProfileSchema");
const internProfileSchema = require("./internProfileSchema");
const {
  withdrawSchema,
  donateSchema,
} = require("./hostDashboard");

// Schemas for each route
const schemas = {
  [HOST_COMPLETE_PROFILE]: hostProfileSchema,
  [INTERN_COMPLETE_PROFILE]: internProfileSchema,
  [DONATION_URL]: donateSchema,
  [WITHDRAW_REQUEST_URL]: withdrawSchema,
};

// The supported methods for each route
const methods = {
  [HOST_COMPLETE_PROFILE]: ["POST"],
  [INTERN_COMPLETE_PROFILE]: ["POST"],
  [DONATION_URL]: ["POST"],
  [WITHDRAW_REQUEST_URL]: ["POST"],
};

const validation = (req, res, next) => {
  const schema = schemas[req.path];
  const schemaSupportedMethods = methods[req.path];
  if (schema && schemaSupportedMethods && schemaSupportedMethods.includes(req.method)) {
    schema.validate(req.body, { abortEarly: false, stripUnknown: true })
      .then((data) => {
        // if everything is validate, change the body to the modified version of it
        req.body = data;
        next();
      }).catch(() => {
        // maybe we should do this in an errror middleware next(error), then handle it there.
        const customError = {
          status: "failed",
          error: "Invalid request data. Please review request and try again.",
        };
        res.status(422).json(customError);
      });
  } else {
    next();
  }
};

module.exports = validation;
