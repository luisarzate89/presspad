const Joi = require("joi");

const hostProfileSchema = Joi.object({
  // profile
  birthDate: Joi.date().required(),
  hometown: Joi.string().max(10),
  gender: Joi.string().required(),
  school: Joi.string().max(10),
  bio: Joi.string().max(250).required(),
  profileImage: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(false),
  }).required(),
  jobTitle: Joi.string().max(10).required(),
  organisation: Joi.string().max(10).required(),
  workingArea: Joi.string().required(),
  hostingReasonAnswer: Joi.string().max(250),
  mentoringExperienceAnswer: Joi.string().max(250),
  industryExperienceAnswer: Joi.string().max(250),
  backgroundAnswer: Joi.string().max(250),
  // offer
  photos: Joi.array().length(3).items(
    Joi.object({
      fileName: Joi.string().required(),
      isPrivate: Joi.boolean().default(false),
    }),
  ).required(),
  //  /* waiting for confirmation on address
  addressLine1: Joi.string().required(),
  addressLine2: Joi.string().allow(""),
  addressCity: Joi.string().required(),
  addressPostCode: Joi.string().required(),
  //   waiting for comfirmation on address */
  availableDates: Joi.array().min(1).items(
    Joi.object({
      startDate: Joi.date(),
      endDate: Joi.date(),
    }),
  ).required(),
  accommodationChecklist: Joi.array().items(Joi.string()),
  neighbourhoodDescription: Joi.string().max(250),
  otherInfo: Joi.string().max(250),
  // details
  photoID: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(true),
  }).required(),
  hearAboutPressPadAnswer: Joi.string().max(50).required(),
  phoneNumber: Joi.string().required(),
  reference1: Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
  }).required(),
  reference2: Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
  }).required(),
  DBSCheck: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(true),
  }),
  sexualOrientation: Joi.string(),
  degreeLevel: Joi.string(),
  ethnicity: Joi.string(),
  earningOfParents: Joi.string(),
  disability: Joi.string(),
  parentsWorkInPress: Joi.string(),
  caringResponsibilities: Joi.string(),
  consentedOnPressPadTerms: Joi.boolean(),
});

module.exports = hostProfileSchema;
