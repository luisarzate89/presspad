import { array, boolean, date, object, string, lazy } from 'yup';
import { optionalWordLengthValidator } from '../../../helpers';

const errMsgs = require('../../../constants/errorMessages');

export const profileSchema = object().shape({
  birthDate: date()
    .typeError(errMsgs.BIRTHDATE)
    .required(errMsgs.BIRTHDATE),
  hometown: string(errMsgs.HOMETOWN)
    .ensure()
    .wordLengthValidator(10)
    .required(errMsgs.HOMETOWN),
  gender: string(errMsgs.GENDER).required(errMsgs.GENDER),
  school: lazy(optionalWordLengthValidator(10)),
  bio: string(errMsgs.BIO)
    .ensure()
    .wordLengthValidator(250)
    .required(errMsgs.BIO),
  profileImage: object({
    fileName: string().required(errMsgs.PROFILE_IMAGE),
    isPrivate: boolean().default(false),
  }).required(),
  jobTitle: string()
    .ensure()
    .wordLengthValidator(10)
    .required(errMsgs.JOB_TITLE),
  organisation: string()
    .ensure()
    .wordLengthValidator(10)
    .required(errMsgs.ORGANISATION),
  workingArea: string().required(errMsgs.WORKING_AREA),
  hostingReasonAnswer: lazy(optionalWordLengthValidator(250)),
  mentoringExperienceAnswer: lazy(optionalWordLengthValidator(250)),
  industryExperienceAnswer: lazy(optionalWordLengthValidator(250)),
  backgroundAnswer: lazy(optionalWordLengthValidator(250)),
});
export const offerSchema = object({
  photos1: object({
    fileName: string().required(errMsgs.LISTING_PHOTOS_ERROR),
    isPrivate: boolean().default(false),
  }).required(errMsgs.LISTING_PHOTOS_ERROR),
  photos2: object({
    fileName: string().required(errMsgs.LISTING_PHOTOS_ERROR),
    isPrivate: boolean().default(false),
  }).required(errMsgs.LISTING_PHOTOS_ERROR),
  photos3: object({
    fileName: string().required(errMsgs.LISTING_PHOTOS_ERROR),
    isPrivate: boolean().default(false),
  }).required(),
  address: object({
    addressline1: string()
      .max(50, errMsgs.MAX(50))
      .required('Required'),
    addressline2: string().max(50, errMsgs.MAX(50)),
    city: string()
      .max(50, errMsgs.MAX(50))
      .required('Required'),
    postcode: string()
      .max(50, errMsgs.MAX(50))
      .required('Required'),
  }),
  availableDates: array(
    object({
      startDate: date(),
      endDate: date(),
    }),
  ).required(errMsgs.AVAILABLE_DATES),
  accommodationChecklist: array(string()).required(
    errMsgs.ACCOMMODATION_CHECKLIST,
  ),
  neighbourhoodDescription: lazy(optionalWordLengthValidator(250)),
  otherInfo: lazy(optionalWordLengthValidator(250)),
});
export const detailsSchema = object({
  photoID: object({
    fileName: string().required(errMsgs.PHOTO_ID),
    isPrivate: boolean().default(true),
  }).required(),
  hearAboutPressPadAnswer: string()
    .ensure()
    .wordLengthValidator(50)
    .required(errMsgs.REQUIRED),
  phoneNumber: string()
    .max(50, errMsgs.MAX(50))
    .required(errMsgs.PHONE_NUMBER),
  reference1: object({
    name: string().max(50, errMsgs.MAX(50)),
    email: string().email(errMsgs.EMAIL),
  }),
  reference2: object({
    name: string().max(50, errMsgs.MAX(50)),
    email: string().email(errMsgs.EMAIL),
  }),
  DBSCheck: object({
    fileName: string(),
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
    .oneOf([true], errMsgs.CONSENT)
    .required(errMsgs.CONSENT),
});
