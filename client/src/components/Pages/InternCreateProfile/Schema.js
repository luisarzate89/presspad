import { boolean, date, object, string, lazy } from "yup";
import { optionalWordLengthValidator } from "../../../helpers";

export const profileSchema = object({
  birthDate: date()
    .typeError("Please select a date")
    .required(),
  gender: string()
    .typeError("Please select a gender")
    .required(),
  hometown: string()
    .required()
    .ensure()
    .wordLengthValidator(10),
  school: string()
    .required("Please enter your school or university")
    .ensure()
    .wordLengthValidator(10),
  profileImage: object({
    fileName: string()
      .ensure()
      .required("Please upload a photo of yourself"),
    isPrivate: boolean().default(false),
  }).required("Please upload a photo of yourself"),
  interests: string()
    .typeError("Please select an area of interest")
    .required(),
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
    .typeError("Please enter your phone number")
    .max(50, "Invalid phone number")
    .required("Please enter your phone number"),
  reference1: object({
    name: string()
      .max(50)
      .ensure(),
    email: string()
      .email()
      .ensure(),
  }),
  reference2: object({
    name: string()
      .max(50)
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
  earningOfParents: lazy(optionalWordLengthValidator(250)),
  disability: lazy(optionalWordLengthValidator(250)),
  parentsWorkInPress: lazy(optionalWordLengthValidator(250)),
  caringResponsibilities: lazy(optionalWordLengthValidator(250)),
  allergies: lazy(optionalWordLengthValidator(50)),
  backgroundAnswer: lazy(optionalWordLengthValidator(250)),
  consentedOnPressPadTerms: boolean()
    .oneOf([true], "You must agree to the terms in order to use PressPad")
    .required(),
});
