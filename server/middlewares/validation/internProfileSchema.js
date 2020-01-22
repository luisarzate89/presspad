const Joi = require("@hapi/joi");

const wordLengthValidator = require("./wordLengthValidator");

const internProfileSchema = Joi.object({
  birthDate: Joi.date().required(),
  gender: Joi.string().required(),
  hometown: Joi.string().custom(wordLengthValidator(10, "hometown")).required(),
  school: Joi.string().custom(wordLengthValidator(10, "school")).required(),
  profileImage: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(false),
  }).required(),
  interests: Joi.string().required(),
  bio: Joi.string().custom(wordLengthValidator(250, "bio")).required(),
  organisation: Joi.string().custom(wordLengthValidator(10, "organisation")).allow(""),
  useReasonAnswer: Joi.string().custom(wordLengthValidator(250, "useReasonAnswer")),
  issueAnswer: Joi.string().custom(wordLengthValidator(250, "issueAnswer")),
  storyAnswer: Joi.string().custom(wordLengthValidator(250, "storyAnswer")),
  mentorDescribeAnswer: Joi.string().custom(wordLengthValidator(250, "mentorDescribeAnswer")),
  photoID: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(true),
  }).required(),
  hearAboutPressPadAnswer: Joi.string().custom(wordLengthValidator(50, "hearAboutPressPadAnswer")).required(),
  phoneNumber: Joi.string().max(50).required(),
  reference1: Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
  }),
  reference2: Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
  }),
  offerLetter: Joi.object({
    fileName: Joi.string(),
    isPrivate: Joi.boolean().default(true),
  }),
  internshipOfficeAddress: Joi.string().custom(wordLengthValidator(50, "internshipOfficeAddress")).required(),
  emergencyContact: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
  }),
  DBSCheck: Joi.object({
    fileName: Joi.string(),
    isPrivate: Joi.boolean().default(true),
  }),
  sexualOrientation: Joi.string(),
  degreeLevel: Joi.string(),
  ethnicity: Joi.string(),
  earningOfParents: Joi.string(),
  disability: Joi.string(),
  parentsWorkInPress: Joi.string(),
  caringResponsibilities: Joi.string(),
  allergies: Joi.string().custom(wordLengthValidator(50, "allergies")),
  backgroundAnswer: Joi.string().custom(wordLengthValidator(250, "backgroundAnswer")),
  consentedOnPressPadTerms: Joi.boolean().required(),
});

module.exports = internProfileSchema;
