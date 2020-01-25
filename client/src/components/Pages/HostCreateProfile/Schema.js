import { object, date, string, boolean, array } from "yup";
import { wordLengthValidator } from "../../../helpers";

export const profileSchema = object({
  birthDate: date().required(),
  hometown: string()
    .ensure()
    .transform(wordLengthValidator(10, "hometown")),
  gender: string().required(),
  school: string()
    .ensure()
    .transform(wordLengthValidator(10, "school")),
  bio: string()
    .ensure()
    .transform(wordLengthValidator(250, "bio"))
    .required(),
  profileImage: object({
    fileName: string().required(),
    isPrivate: boolean().default(false),
  }).required(),
  jobTitle: string()
    .ensure()
    .transform(wordLengthValidator(10, "jobTitle"))
    .required(),
  organisation: string()
    .ensure()
    .transform(wordLengthValidator(10, "organisation"))
    .required(),
  workingArea: string().required(),
  hostingReasonAnswer: string().transform(
    wordLengthValidator(250, "hostingReasonAnswer"),
  ),
  mentoringExperienceAnswer: string().transform(
    wordLengthValidator(250, "mentoringExperienceAnswer"),
  ),
  industryExperienceAnswer: string().transform(
    wordLengthValidator(250, "industryExperienceAnswer"),
  ),
  backgroundAnswer: string().transform(
    wordLengthValidator(250, "backgroundAnswer"),
  ),
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
  accommodationChecklist: array()
    .of(string())
    .required(),
  neighbourhoodDescription: string().max(250),
  otherInfo: string()
    .ensure()
    .transform(wordLengthValidator(250, "otherInfo")),
});
export const detailsSchema = object({
  photoID: object({
    fileName: string().required(),
    isPrivate: boolean().default(true),
  }).required(),
  hearAboutPressPadAnswer: string()
    .ensure()
    .transform(wordLengthValidator(50, "hearAboutPressPadAnswer"))
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
  sexualOrientation: string(),
  degreeLevel: string(),
  ethnicity: string(),
  earningOfParents: string(),
  disability: string(),
  parentsWorkInPress: string(),
  caringResponsibilities: string(),
  consentedOnPressPadTerms: boolean(),
});
