const { HOST_COMPLETE_PROFILE } = require("../../../client/src/constants/apiRoutes");
const hostProfileSchema = require("./hostProfileSchema");

// Schemas for each route
const schemas = {
  [HOST_COMPLETE_PROFILE]: hostProfileSchema,
};

// The supported methods for each route
const methods = {
  [HOST_COMPLETE_PROFILE]: ["POST"],
};

const validation = (req, res, next) => {
  const schema = schemas[req.path];
  const schemaSupportedMethods = methods[req.path];

  if (schema && schemaSupportedMethods.includes(req.method)) {
    schema.validate(req.body, { abortEarly: false, stripUnknown: true })
      .then((data) => {
        // if everything is validate, change the body to the modified version of it
        req.body = data;
      }).catch(() => {
        // maybe we should do this in an errror middleware next(error), then handle it there.
        const customError = {
          status: "failed",
          error: "Invalid request data. Please review request and try again.",
        };
        res.status(422).json(customError);
      });
  }

  next();
};

module.exports = validation;
