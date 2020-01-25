const Joi = require("@hapi/joi");

const wordLengthValidator = require("./wordLengthValidator");

const internProfileSchema = Joi.object({
  birthDate: Joi.date().required(),
  gender: Joi.string().required(),
  hometown: Joi.string()
    .custom(wordLengthValidator(10, "hometown"))
    .required(),
  school: Joi.string()
    .custom(wordLengthValidator(10, "school"))
    .required(),
  profileImage: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(false),
  }).required(),
  interests: Joi.string().required(),
  bio: Joi.string()
    .custom(wordLengthValidator(250, "bio"))
    .required(),
  organisation: Joi.string()
    .allow("")
    .custom(wordLengthValidator(10, "organisation")),
  useReasonAnswer: Joi.string()
    .custom(wordLengthValidator(250, "useReasonAnswer"))
    .allow(""),
  issueAnswer: Joi.string()
    .custom(wordLengthValidator(250, "issueAnswer"))
    .allow(""),
  storyAnswer: Joi.string()
    .custom(wordLengthValidator(250, "storyAnswer"))
    .allow(""),
  mentorDescribeAnswer: Joi.string()
    .allow("")
    .custom(wordLengthValidator(250, "mentorDescribeAnswer")),
  photoID: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(true),
  }).required(),
  hearAboutPressPadAnswer: Joi.string()
    .custom(wordLengthValidator(50, "hearAboutPressPadAnswer"))
    .required(),
  phoneNumber: Joi.string()
    .max(50)
    .required(),
  reference1: Joi.object({
    name: Joi.string()
      .max(50)
      .allow(""),
    email: Joi.string()
      .email()
      .allow(""),
  }),
  reference2: Joi.object({
    name: Joi.string()
      .max(50)
      .allow(""),
    email: Joi.string()
      .email()
      .allow(""),
  }),
  offerLetter: Joi.object({
    fileName: Joi.string().allow(""),
    isPrivate: Joi.boolean().default(true),
  }),
  internshipOfficeAddress: Joi.string()
    .custom(wordLengthValidator(50, "internshipOfficeAddress"))
    .allow(""),
  emergencyContact: Joi.object({
    name: Joi.string().allow(""),
    email: Joi.allow(""),
    phoneNumber: Joi.string().allow(""),
  }),
  DBSCheck: Joi.object({
    fileName: Joi.string().allow(""),
    isPrivate: Joi.boolean().default(true),
  }),
  sexualOrientation: Joi.string().allow(""),
  degreeLevel: Joi.string().allow(""),
  ethnicity: Joi.string().allow(""),
  earningOfParents: Joi.string().allow(""),
  disability: Joi.string().allow(""),
  parentsWorkInPress: Joi.string().allow(""),
  caringResponsibilities: Joi.string().allow(""),
  allergies: Joi.string()
    .allow("")
    .custom(wordLengthValidator(50, "allergies")),
  backgroundAnswer: Joi.string()
    .allow("")
    .custom(wordLengthValidator(250, "backgroundAnswer")),
  consentedOnPressPadTerms: Joi.boolean().required(),
});

module.exports = internProfileSchema;
