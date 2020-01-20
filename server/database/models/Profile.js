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
      required: true,
    },
    school: {
      type: String,
      validate: wordLengthValidator(10, "school"),
      required: true,
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
      required: false,
    },
    phoneNumber: {
      type: String,
      validate: wordLengthValidator(50, "phoneNumber"),
      required: true,
    },
    emergencyContact: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
    },
    DBSCheck: {
      fileName: {
        type: String,
        required: true,
      },
      isPrivate: {
        type: Boolean,
        default: true,
      },
    },
    sexualOrientation: {
      type: String,
      enum: types.sexualOrientation,
    },
    degreeLevel: {
      type: String,
      required: false,
    },
    ethnicity: {
      type: String,
      enum: types.ethnicity,
    },
    earningOfParents: {
      type: String,
      required: false,
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
      type: String,
      validate: wordLengthValidator(200, "backgroundAnswer"),
      required: false,
    },
    consentedOnPressPadTerms: {
      type: Boolean,
      default: false,
      required: true,
    },
    workingArea: {
      type: String,
      required: false, // required for hosts
    },
    hostingReasonAnswer: {
      type: String,
      validate: wordLengthValidator(250, "hostingReasonAnswer"),
      required: false, // required for hosts
    },
    mentoringExperienceAnswer: {
      type: String,
      validate: wordLengthValidator(250, "mentoringExperienceAnswer"),
      required: false, // required for hosts
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
    address: {
      type: String,
      validate: wordLengthValidator(50, "internshipOfficeAddress"),
      required: false,
    },
    interests: {
      type: String,
      trim: true,
      enum: types.interests,
      required: false,
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
      required: false,
    },
    jobTitle: {
      type: String,
      lowercase: true,
      // required: true, required for hosts
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

    verification: {
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
          required: false, // required for hosts
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
        contact: {
          type: String,
          required: false,
        },
      },
      reference2: {
        name: {
          type: String,
          required: false,
        },
        contact: {
          type: String,
          required: false,
        },
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
