const Joi = require("joi");

const internCompleteProfileSchema = Joi.object({
  profileImage: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(false),
  }).required(),
  verified: Joi.boolean().default(true),
  bio: Joi.string().required(),
  favouriteArticle: Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    link: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
  jobTitle: Joi.string().required(),
  organisation: Joi.string().allow(""),
  photoID: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(true),
  }).required(),
  offerLetter: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(true),
  }),
  reference1: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
  }).required(),
  reference2: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
  }).required(),

});

module.exports = internCompleteProfileSchema;
