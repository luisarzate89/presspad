import * as yup from "yup";
import { wordLengthValidator } from "../../../helpers";

export const profileSchema = yup.object({
  birthDate: yup
    .date()
    .typeError("Please select a date")
    .required(),
  gender: yup
    .string()
    .typeError("Please select a gender")
    .required(),
  hometown: yup
    .string()
    .required("Please enter your hometown")
    .ensure()
    .transform(wordLengthValidator(10, "hometown")),
  school: yup
    .string()
    .required("Please enter your school or university")
    .ensure()
    .transform(wordLengthValidator(10, "school"))
    .required("Please enter your school or university"),
  profileImage: yup
    .object({
      fileName: yup
        .string()
        .ensure()
        .required("Please upload a photo of yourself"),
      isPrivate: yup.boolean().default(false),
    })
    .required("Please upload a photo of yourself"),
  interests: yup
    .string()
    .typeError("Please select an area of interest")
    .required(),
  bio: yup
    .string()
    .ensure()
    .transform(wordLengthValidator(250, "bio"))
    .required("Please write a short bio about yourself"),
  organisation: yup
    .string()
    .ensure()
    .transform(wordLengthValidator(10, "organisation")),
  useReasonAnswer: yup
    .string()
    .ensure()
    .transform(wordLengthValidator(250, "useReasonAnswer")),
  issueAnswer: yup
    .string()
    .ensure()
    .transform(wordLengthValidator(250, "issueAnswer")),
  storyAnswer: yup
    .string()
    .ensure()
    .transform(wordLengthValidator(250, "storyAnswer")),
});

export const detailsSchema = yup.object({
  mentorDescribeAnswer: yup
    .string()
    .ensure()
    .transform(wordLengthValidator(250, "mentorDescribeAnswer")),
  photoID: yup
    .object({
      fileName: yup
        .string()
        .ensure()
        .required("Please upload photographic proof of identity"),
      isPrivate: yup.boolean().default(true),
    })
    .required(),
  hearAboutPressPadAnswer: yup
    .string()
    .ensure()
    .transform(wordLengthValidator(50, "hearAboutPressPadAnswer"))
    .required("Please tell us how your heard about PressPad"),
  phoneNumber: yup
    .string()
    .typeError("Please enter your phone number")
    .max(50, "Invalid phone number")
    .required("Please enter your phone number"),
  reference1: yup.object({
    name: yup
      .string()
      .max(50)
      .ensure(),
    email: yup
      .string()
      .email()
      .ensure(),
  }),
  reference2: yup.object({
    name: yup
      .string()
      .max(50)
      .ensure(),
    email: yup
      .string()
      .email()
      .ensure(),
  }),
  offerLetter: yup.object({
    fileName: yup.string().ensure(),
    isPrivate: yup.boolean().default(true),
  }),
  internshipOfficeAddress: yup
    .string()
    .ensure()
    .transform(wordLengthValidator(50, "internshipOfficeAddress")),
  emergencyContact: yup.object({
    name: yup.string().ensure(),
    email: yup
      .string()
      .email()
      .ensure(),
    phoneNumber: yup.string().ensure(),
  }),
  DBSCheck: yup.object({
    fileName: yup.string().ensure(),
    isPrivate: yup.boolean().default(true),
  }),
  sexualOrientation: yup.string().ensure(),
  degreeLevel: yup.string().ensure(),
  ethnicity: yup.string().ensure(),
  earningOfParents: yup.string().ensure(),
  disability: yup.string().ensure(),
  parentsWorkInPress: yup.string().ensure(),
  caringResponsibilities: yup.string().ensure(),
  allergies: yup
    .string()
    .ensure()
    .transform(wordLengthValidator(50, "allergies")),
  backgroundAnswer: yup
    .string()
    .ensure()
    .transform(wordLengthValidator(250, "backgroundAnswer")),
  consentedOnPressPadTerms: yup
    .boolean()
    .oneOf([true], "You must agree to the terms in order to use PressPad")
    .required(),
});
