import { array, boolean, date, object, string, lazy } from "yup";
import { optionalWordLengthValidator } from "../../../helpers";

export const profileSchema = object().shape({
  birthDate: date().required(),
  hometown: string()
    .ensure()
    .wordLengthValidator(10)
    .required(),
  gender: string().required(),
  school: lazy(optionalWordLengthValidator(10)),
  bio: string()
    .ensure()
    .wordLengthValidator(250)
    .required(),
  profileImage: object({
    fileName: string().required(),
    isPrivate: boolean().default(false),
  }).required(),
  jobTitle: string()
    .ensure()
    .wordLengthValidator(10)
    .required(),
  organisation: string()
    .ensure()
    .wordLengthValidator(10)
    .required(),
  workingArea: string().required(),
  hostingReasonAnswer: string().wordLengthValidator(250),
  mentoringExperienceAnswer: string().wordLengthValidator(250),
  industryExperienceAnswer: string().wordLengthValidator(250),
  backgroundAnswer: string().wordLengthValidator(250),
});
export const offerSchema = object({
  photos1: object({
    fileName: string().required(),
    isPrivate: boolean().default(false),
  }).required(),
  photos2: object({
    fileName: string().required(),
    isPrivate: boolean().default(false),
  }).required(),
  photos3: object({
    fileName: string().required(),
    isPrivate: boolean().default(false),
  }).required(),
  //  /* waiting for confirmation on address
  address: string().required(),
  availableDates: array(
    object({
      startDate: date(),
      endDate: date(),
    }),
  ).required(),
  accommodationChecklist: array(string())
    .min(1)
    .required(),
  neighbourhoodDescription: string().max(250),
  otherInfo: string()
    .ensure()
    .wordLengthValidator(250),
});
export const detailsSchema = object({
  photoID: object({
    fileName: string().required(),
    isPrivate: boolean().default(true),
  }).required(),
  hearAboutPressPadAnswer: string()
    .ensure()
    .wordLengthValidator(50)
    .required(),
  phoneNumber: string()
    .max(50)
    .required(),
  reference1: object({
    name: string()
      .max(50)
      .required(),
    email: string()
      .email()
      .required(),
  }),
  reference2: object({
    name: string()
      .max(50)
      .required(),
    email: string()
      .email()
      .required(),
  }),
  DBSCheck: object({
    fileName: string().required(),
    isPrivate: boolean().default(true),
  }),
  // options
  sexualOrientation: lazy(optionalWordLengthValidator(6)),
  degreeLevel: lazy(optionalWordLengthValidator(22)),
  ethnicity: lazy(optionalWordLengthValidator(6)),
  parentProfession: lazy(optionalWordLengthValidator(22)),
  disability: lazy(optionalWordLengthValidator(11)),
  parentsWorkInPress: lazy(optionalWordLengthValidator(5)),
  caringResponsibilities: lazy(optionalWordLengthValidator(250)),
  consentedOnPressPadTerms: boolean()
    .oneOf([true], "You must agree to the terms in order to use PressPad")
    .required(),
});
