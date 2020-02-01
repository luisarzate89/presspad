import { boolean, date, object, string, lazy } from "yup";
import { optionalWordLengthValidator } from "../../../helpers";
import errMsgs from "../../../constants/errorMessages";

export const profileSchema = object({
  birthDate: date()
    .typeError(errMsgs.BIRTHDATE)
    .required(),
  gender: string().required(errMsgs.GENDER),
  hometown: string()
    .ensure()
    .wordLengthValidator(10)
    .required(errMsgs.HOMETOWN),
  school: string()
    .ensure()
    .wordLengthValidator(10)
    .required(errMsgs.SCHOOL),
  profileImage: object({
    fileName: string(errMsgs.PROFILE_IMAGE)
      .ensure()
      .required(errMsgs.PROFILE_IMAGE),
    isPrivate: boolean().default(false),
  }).required(errMsgs.PROFILE_IMAGE),
  interests: string()
    .typeError(errMsgs.AREA_OF_INTEREST)
    .required(errMsgs.AREA_OF_INTEREST),
  bio: string()
    .ensure()
    .wordLengthValidator(250)
    .required("Please write a short bio about yourself"),
  organisation: lazy(optionalWordLengthValidator(10)),
  useReasonAnswer: lazy(optionalWordLengthValidator(250)),
  issueAnswer: lazy(optionalWordLengthValidator(250)),
  storyAnswer: lazy(optionalWordLengthValidator(250)),
  mentorDescribeAnswer: lazy(optionalWordLengthValidator(250)),
});

export const detailsSchema = object({
  photoID: object({
    fileName: string()
      .ensure()
      .required("Please upload photographic proof of identity"),
    isPrivate: boolean().default(true),
  }).required(),
  hearAboutPressPadAnswer: string()
    .ensure()
    .wordLengthValidator(50)
    .required("Please tell us how your heard about PressPad"),
  phoneNumber: string()
    .typeError(errMsgs.PHONE_NUMBER)
    .max(50, "Invalid phone number")
    .required(errMsgs.PHONE_NUMBER),
  reference1: object({
    name: string()
      .max(50, errMsgs.MAX(50))
      .ensure(),
    email: string()
      .email()
      .ensure(),
  }),
  reference2: object({
    name: string()
      .max(50, errMsgs.MAX(50))
      .ensure(),
    email: string()
      .email()
      .ensure(),
  }),
  offerLetter: object({
    fileName: string().ensure(),
    isPrivate: boolean().default(true),
  }),
  internshipOfficeAddress: lazy(optionalWordLengthValidator(50)),
  emergencyContact: object({
    name: string().ensure(),
    email: string()
      .email()
      .ensure(),
    phoneNumber: string().ensure(),
  }),
  DBSCheck: object({
    fileName: string().ensure(),
    isPrivate: boolean().default(true),
  }),
  sexualOrientation: lazy(optionalWordLengthValidator(250)),
  degreeLevel: lazy(optionalWordLengthValidator(250)),
  ethnicity: lazy(optionalWordLengthValidator(250)),
  parentProfession: lazy(optionalWordLengthValidator(250)),
  disability: lazy(optionalWordLengthValidator(250)),
  parentsWorkInPress: lazy(optionalWordLengthValidator(250)),
  caringResponsibilities: lazy(optionalWordLengthValidator(250)),
  allergies: lazy(optionalWordLengthValidator(50)),
  backgroundAnswer: lazy(optionalWordLengthValidator(250)),
  consentedOnPressPadTerms: boolean()
    .oneOf([true], errMsgs.CONSENT)
    .required(),
});
