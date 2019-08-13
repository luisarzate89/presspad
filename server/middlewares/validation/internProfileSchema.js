const Joi = require("joi");

const internProfileSchema = Joi.object({
  profileImage: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(false),
  }).required(),
  bio: Joi.string().required(),
  favouriteArticle: Joi.object({
    title: Joi.string(),
    author: Joi.string(),
    link: Joi.string(),
  }),
  jobTitle: Joi.string(),
  photoIDFile: Joi.object({
    fileName: Joi.string(),
    isPrivate: Joi.boolean().default(true),
  }),
  offerLetter: Joi.object({
    fileName: Joi.string(),
    isPrivate: Joi.boolean().default(true),
  }),
  reference1: Joi.object({
    name: Joi.string(),
    contact: Joi.string(),
  }).and("name", "contact"),
  reference2: Joi.object({
    name: Joi.string(),
    contact: Joi.string(),
  }).and("name", "contact"),
});

module.exports = internProfileSchema;
