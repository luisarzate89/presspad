const Joi = require("joi");

const hostProfileSchema = Joi.object({
  profileImage: Joi.object({
    name: Joi.string().required(),
    isPrivate: Joi.boolean().default(true),
  }).required(),
  bio: Joi.string().required(),
  favouriteArticle: Joi.string(),
  organisationName: Joi.string().required(),
  organisationWebsite: Joi.string().uri().required(),
  jobTitle: Joi.string(),
  pressPass: Joi.object({
    name: Joi.string().required(),
    isPrivate: Joi.boolean().default(false),
  }).required(),

  addressLine1: Joi.string().required(),
  addressLine2: Joi.string(),
  addressCity: Joi.string().required(),
  addressPostCode: Joi.string().required(),

  offerImages1: Joi.object({
    name: Joi.string().required(),
    isPrivate: Joi.boolean().default(true),
  }),
  offerImages2: Joi.object({
    name: Joi.string().required(),
    isPrivate: Joi.boolean().default(true),
  }),
  offerImages3: Joi.object({
    name: Joi.string().required(),
    isPrivate: Joi.boolean().default(true),
  }),
});

module.exports = hostProfileSchema;
