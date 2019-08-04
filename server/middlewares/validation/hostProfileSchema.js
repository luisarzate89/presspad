const Joi = require("joi");

const hostProfileSchema = Joi.object({
  profileImage: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(false),
  }).required(),
  bio: Joi.string().required(),
  interests: Joi.string(),
  organisationName: Joi.string().required(),
  organisationWebsite: Joi.string().uri().required(),
  jobTitle: Joi.string(),
  pressPass: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(true),
  }).required(),

  addressLine1: Joi.string().required(),
  addressLine2: Joi.string(),
  addressCity: Joi.string().required(),
  addressPostCode: Joi.string().required(),

  offerImages1: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(false),
  }),
  offerImages2: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(false),
  }),
  offerImages3: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(false),
  }),

  offerDescription: Joi.string().required(),
  availableDates: Joi.array().items(Joi.object({
    startDate: Joi.date(),
    endDate: Joi.date(),
  })).required(),
});

module.exports = hostProfileSchema;
