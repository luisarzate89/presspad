const Joi = require("@hapi/joi");

const wordLengthValidator = require("./wordLengthValidator");

const hostProfileSchema = Joi.object({
  // profile
  birthDate: Joi.date().required(),
  hometown: Joi.string().custom(wordLengthValidator(10, "hometown")),
  gender: Joi.string().required(),
  school: Joi.string().custom(wordLengthValidator(10, "school")),
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
  hostingReasonAnswer: Joi.string().custom(
    wordLengthValidator(250, "hostingReasonAnswer"),
  ),
  mentoringExperienceAnswer: Joi.string().custom(
    wordLengthValidator(250, "mentoringExperienceAnswer"),
  ),
  industryExperienceAnswer: Joi.string().custom(
    wordLengthValidator(250, "industryExperienceAnswer"),
  ),
  backgroundAnswer: Joi.string().custom(
    wordLengthValidator(250, "backgroundAnswer"),
  ),
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
  neighbourhoodDescription: Joi.string().max(250),
  otherInfo: Joi.string().custom(wordLengthValidator(250, "otherInfo")),
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
