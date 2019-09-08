const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      unique: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      required: true,
    },
    interests: {
      type: String,
      trim: true,
    },
    organisation: {
      name: String,
      website: String,
    },
    jobTitle: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
    },
    profileImage: {
      fileName: String,
      isPrivate: {
        type: Boolean,
        default: false,
      },
    },
    favouriteArticle: {
      title: String,
      author: String,
      link: String,
      description: String,
    },
    // later plan would be enum [basic, pro, custom...]

    verification: {
      photoID: {
        fileName: String,
        isPrivate: {
          type: Boolean,
          default: true,
        },
      },
      offerLetter: {
        fileName: String,
        isPrivate: {
          type: Boolean,
          default: true,
        },
      },
      reference1: {
        name: String,
        contact: String,
      },
      reference2: {
        name: String,
        contact: String,
      },
    },
    badge: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Profile = model("profiles", profileSchema);

module.exports = Profile;
