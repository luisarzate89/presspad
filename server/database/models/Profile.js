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
  interests: [String],
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
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  favouriteArticle: {
    title: String,
    author: String,
    link: String,
  },
  // later plan would be enum [basic, pro, custom...]

  verification: {
    photoID: String,
    offerLetter: String,
    reference1: {
      name: String,
      contact: String,
    },
    reference2: {
      name: String,
      contact: String,
    },
  },
});

const Profile = model("profiles", profileSchema);

module.exports = Profile;
