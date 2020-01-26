const Joi = require("@hapi/joi");

const wordLengthValidator = require("./wordLengthValidator");

const hostProfileSchema = Joi.object({
  // profile
  birthDate: Joi.date().required(),
  hometown: Joi.string().custom(wordLengthValidator(10, "hometown")),
  gender: Joi.string().required(),
  school: Joi.string()
    .allow("")
    .custom(wordLengthValidator(10, "school")),
  interests: Joi.string().allow(""),
  bio: Joi.string()
    .custom(wordLengthValidator(250, "bio"))
    .required(),
  profileImage: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(false),
  }).required(),
  jobTitle: Joi.string()
    .custom(wordLengthValidator(10, "jobTitle"))
    .required(),
  organisation: Joi.string()
    .custom(wordLengthValidator(10, "organisation"))
    .required(),
  workingArea: Joi.string().required(),
  hostingReasonAnswer: Joi.string()
    .custom(wordLengthValidator(250, "hostingReasonAnswer"))
    .allow(""),
  mentoringExperienceAnswer: Joi.string()
    .custom(wordLengthValidator(250, "mentoringExperienceAnswer"))
    .allow(""),
  industryExperienceAnswer: Joi.string()
    .custom(wordLengthValidator(250, "industryExperienceAnswer"))
    .allow(""),
  backgroundAnswer: Joi.string()
    .custom(wordLengthValidator(250, "backgroundAnswer"))
    .allow(""),
  // offer
  photos: Joi.array()
    .length(3)
    .items(
      Joi.object({
        fileName: Joi.string().required(),
        isPrivate: Joi.boolean().default(false),
      }),
    )
    .required(),
  //  /* waiting for confirmation on address
  address: Joi.string().required(),
  availableDates: Joi.array()
    .min(1)
    .items(
      Joi.object({
        startDate: Joi.date(),
        endDate: Joi.date(),
      }),
    )
    .required(),
  accommodationChecklist: Joi.array().items(Joi.string()),
  neighbourhoodDescription: Joi.string()
    .max(250)
    .allow(""),
  otherInfo: Joi.string()
    .custom(wordLengthValidator(250, "otherInfo"))
    .allow(""),
  // details
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
      .required(),
    email: Joi.string()
      .email()
      .required(),
  }),
  reference2: Joi.object({
    name: Joi.string()
      .max(50)
      .required(),
    email: Joi.string()
      .email()
      .required(),
  }),
  DBSCheck: Joi.object({
    fileName: Joi.string().required(),
    isPrivate: Joi.boolean().default(true),
  }),
  sexualOrientation: Joi.string().allow(""),
  degreeLevel: Joi.string().allow(""),
  ethnicity: Joi.string().allow(""),
  parentProfession: Joi.string().allow(""),
  disability: Joi.string().allow(""),
  parentsWorkInPress: Joi.string().allow(""),
  caringResponsibilities: Joi.string().allow(""),
  consentedOnPressPadTerms: Joi.boolean()
    .only()
    .allow(true),
});

module.exports = hostProfileSchema;
