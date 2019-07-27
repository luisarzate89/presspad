const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  bio: {
    type: String,
    required: true,
  },
  interests: String,
  organisation: {
    name: String,
    website: String,
  },
  jobTitle: {
    type: String,
    lowercase: true,
    required: true,
  },
  pressPass: {
    fileName: String,
    isPrivate: {
      type: Boolean,
      default: true,
    },
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
});

const Profile = model("profiles", profileSchema);

module.exports = Profile;
