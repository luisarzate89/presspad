const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  verified: {
    type: Boolean,
    default: false
  },
  bio: String,
  interests: [String],
  organisation: {
    name: String,
    website: String
  },
  jobTitle: String,
  pressPass: String,
  favouriteArticle: {
    title: String,
    author: String,
    link: String
  },
  plan: {
    enum: ['basic', 'pro', 'custom'],
    default: 'basic'
  },
  budgetHolder: {
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    }
  },
  verification: {
    photoID: String,
    OfferLetter: String,
    Reference1: String,
    Reference2: String
  }
});

const Profile = model('profiles', profileSchema);

module.exports = Profile;
