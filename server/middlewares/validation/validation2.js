const boom = require('boom');
const { SIGNUP_URL } = require('../../../client/src/constants/apiRoutes');
const { signupSchema } = require('../../../client/src/validation');
// Schemas for each route
const schemas = {
  [SIGNUP_URL]: signupSchema,
};

// The supported methods for each route
const methods = {
  [SIGNUP_URL]: ['POST'],
};

// Validate function
const validate = (schema, dataObj) => {
  return schema.validate(dataObj, { stripUnknown: true }).catch(err => {
    throw err.message;
  });
};
// schema.validateAsync(dataObj, { abortEarly: false, stripUnknown: true });

// validation middleware
const validation = (req, res, next) => {
  const schema = schemas[req.path];
  const schemaSupportedMethods = methods[req.path];

  if (
    schema &&
    schemaSupportedMethods &&
    schemaSupportedMethods.includes(req.method)
  ) {
    validate(schema, req.body)
      .then(data => {
        // if everything is validate, change the body to the modified version of it
        req.body = data;
        next();
      })
      .catch(err => {
        next(boom.badData(err));
      });
  } else {
    next();
  }
};

module.exports = validation;
