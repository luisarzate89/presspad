import * as yup from "yup";
import { wordLengthValidator } from "../../../helpers";

export const profileSchema = yup.object({
  birthDate: yup.date().required(),
  gender: yup.string().required(),
  hometown: yup
    .string()
    .required()
    .ensure()
    .transform(wordLengthValidator(10, "hometown")),
  school: yup
    .string()
    .required()
    .ensure()
    .transform(wordLengthValidator(10, "school"))
    .required(),
  profileImage: yup
    .object({
      fileName: yup
        .string()
        .ensure()
        .required(),
      isPrivate: yup.boolean().default(false),
    })
    .required(),
  interests: yup.string().required(),
  bio: yup
    .string()
    .ensure()
    .transform(wordLengthValidator(250, "bio"))
    .required(),
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
        .required(),
      isPrivate: yup.boolean().default(true),
    })
    .required(),
  hearAboutPressPadAnswer: yup
    .string()
    .transform(wordLengthValidator(50, "hearAboutPressPadAnswer"))
    .required(),
  phoneNumber: yup
    .string()
    .max(50)
    .required(),
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
    .transform(wordLengthValidator(250, "backgroundAnswer")),
  consentedOnPressPadTerms: yup
    .boolean()
    .oneOf([true], "You must agree on the terms of PressPad")
    .required(),
});
