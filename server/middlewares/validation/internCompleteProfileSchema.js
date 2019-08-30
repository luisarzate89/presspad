const Joi = require("joi");

const internCompleteProfileSchema = Joi.object({
  profileImage: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(false),
  }).required(),
  bio: Joi.string().required(),
  favouriteArticle: Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    link: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
  jobTitle: Joi.string().required(),
  organisation: Joi.object({
    name: Joi.string().required(),
    website: Joi.string().allow(""),
  }).required(),
  verification: Joi.object({
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
      contact: Joi.string().required(),
    }).required(),
    reference2: Joi.object({
      name: Joi.string().required(),
      contact: Joi.string().required(),
    }).required(),
  }).required(),
});

module.exports = internCompleteProfileSchema;
