const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const { types } = require("./../constants");
const { wordLengthValidator } = require("../utils");

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      unique: true,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: types.gender,
      required: true,
    },
    hometown: {
      type: String,
      validate: wordLengthValidator(10, "hometown"),
      required: false, // required for Intern
    },
    school: {
      type: String,
      validate: wordLengthValidator(10, "school"),
      required: false, // required for Intern
    },
    useReasonAnswer: {
      type: String,
      validate: wordLengthValidator(250, "useReasonAnswer"),
      required: false,
    },
    issueAnswer: {
      type: String,
      validate: wordLengthValidator(250, "issueAnswer"),
      required: false,
    },
    storyAnswer: {
      type: String,
      validate: wordLengthValidator(250, "storyAnswer"),
      required: false,
    },
    mentorDescribeAnswer: {
      type: String,
      validate: wordLengthValidator(200, "mentorDescribeAnswer"),
      required: false,
    },
    hearAboutPressPadAnswer: {
      type: String,
      validate: wordLengthValidator(50, "hearAboutPressPadAnswer"),
      required: true,
    },
    phoneNumber: {
      type: String,
      validate: wordLengthValidator(50, "phoneNumber"),
      required: true,
    },
    emergencyContact: {
      name: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
      phoneNumber: {
        type: String,
        required: false,
      },
    },
    DBSCheck: {
      fileName: {
        type: String,
        required: false,
      },
      isPrivate: {
        type: Boolean,
        default: true,
      },
    },
    sexualOrientation: {
      type: String,
      enum: types.sexualOrientation,
      required: false,
    },
    degreeLevel: {
      type: String,
      required: false,
      enum: types.degreeLevel,
    },
    ethnicity: {
      type: String,
      enum: types.ethnicity,
    },
    parentProfession: {
      type: String,
      required: false,
      enum: types.parentProfession,
    },
    disability: {
      type: String,
      enum: types.disability,
      required: false,
    },
    parentsWorkInPress: {
      type: String,
      enum: types.parentsWorkInPress,
      required: false,
    },
    caringResponsibilities: {
      type: String,
      required: false,
    },
    allergies: {
      type: String,
      validate: wordLengthValidator(50, "allergies"),
      required: false,
    },
    backgroundAnswer: {
      // Is there anything about your background...
      type: String,
      validate: wordLengthValidator(250, "backgroundAnswer"),
      required: false,
    },
    consentedOnPressPadTerms: {
      type: Boolean,
      default: false,
      required: true,
    },
    workingArea: {
      type: String,
      enum: types.workingArea,
      required: false, // required for hosts
    },
    hostingReasonAnswer: {
      type: String,
      validate: wordLengthValidator(250, "hostingReasonAnswer"),
      required: false,
    },
    mentoringExperienceAnswer: {
      type: String,
      validate: wordLengthValidator(250, "mentoringExperienceAnswer"),
      required: false,
    },
    industryExperienceAnswer: {
      type: String,
      validate: wordLengthValidator(250, "industryExperienceAnswer"),
      required: false,
    },
    internshipOfficeAddress: {
      type: String,
      validate: wordLengthValidator(50, "internshipOfficeAddress"),
      required: false,
    },
    interests: {
      type: String,
      trim: true,
      enum: types.interests,
      required: false, // required for Interns
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    bio: {
      type: String,
      validate: wordLengthValidator(250, "bio"),
      required: true,
    },
    organisation: {
      type: String,
      validate: wordLengthValidator(10, "organisation"),
      required: false, // required for hosts
    },
    jobTitle: {
      type: String,
      lowercase: true,
      required: false, // required for hosts
      trim: true,
      validate: wordLengthValidator(10, "jobTitle"),
    },
    profileImage: {
      fileName: {
        type: String,
        required: true,
      },
      isPrivate: {
        type: Boolean,
        default: false,
      },
    },
    pressCard: {
      fileName: {
        type: String,
        required: false,
      },
      isPrivate: {
        type: Boolean,
        default: true,
      },
    },
    photoID: {
      fileName: {
        type: String,
        required: true,
      },
      isPrivate: {
        type: Boolean,
        default: true,
      },
    },
    offerLetter: {
      fileName: {
        type: String,
        required: false, // required for intern
      },
      isPrivate: {
        type: Boolean,
        default: true,
      },
    },
    reference1: {
      name: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
    },
    reference2: {
      name: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
    },
    badge: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Profile = model("profiles", profileSchema);

module.exports = Profile;
