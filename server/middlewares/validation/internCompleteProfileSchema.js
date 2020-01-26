const Joi = require("@hapi/joi");

const internCompleteProfileSchema = Joi.object({
  // About you 1 (required for basic profile)
  birthDate: Joi.date().required(),
  gender: Joi.string().required(),
  hometown: Joi.string().required(),
  school: Joi.string().required(),
  profileImage: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(false),
  }).required(),
  interests: Joi.string().required(),
  bio: Joi.string().required(),

  // Other information 1 (required for booking)
  organisation: Joi.string().required(),
  useReasonAnswer: Joi.string().required(),
  issueAnswer: Joi.string().required(),
  storyAnswer: Joi.string().required(),
  mentorDescribeAnswer: Joi.string().required(),

  // about you 2 (required for basic profile)
  photoID: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(true),
  }).required(),
  hearAboutPressPadAnswer: Joi.string().required(),
  phoneNumber: Joi.string().required(),

  // Other information 2 (required for booking)
  reference1: Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
  }),
  reference2: Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
  }),
  offerLetter: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(true),
  }),
  internshipOfficeAddress: Joi.string().required(),
  emergencyContact: Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    phoneNumber: Joi.string().required(),
  }),
  DBSCheck: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(true),
  }),

  // demographic (required for booking)
  sexualOrientation: Joi.string().required(),
  degreeLevel: Joi.string().required(),
  ethnicity: Joi.string().required(),
  parentProfession: Joi.string().required(),
  disability: Joi.string().required(),
  parentsWorkInPress: Joi.string().required(),
  caringResponsibilities: Joi.string().required(),
  allergies: Joi.string().required(),
  backgroundAnswer: Joi.string().required(),
  consentedOnPressPadTerms: Joi.any().allow(true),
});

module.exports = internCompleteProfileSchema;
