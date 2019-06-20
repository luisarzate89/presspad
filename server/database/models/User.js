const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  // // generate a code for the User
  // // (this is to help generate unique codes for interns by organisations,
  // // combining the orgCode and this code )
  // // this could also be used for the host referral potentially rather than id
  // userCode: {
  //   type: String,
  //   required: true,
  // },
  // this is currently only for hosts as they need to be
  // referred by a superhost. once that code is submitted
  // a transaction gets stored in the referrals table.
  referral: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  // this is for interns and organisation users
  // we need to store the id that's linked to an org
  organisation: {
    type: Schema.Types.ObjectId,
    ref: "organisations",
  },
  role: {
    type: String,
    enum: ["admin", "organisation", "superhost", "host", "organisation", "intern"],
    required: true,
  },
  // if they are part of an organisation, the credits are stored in the orgs table
  credits: Number,
});

userSchema.pre("save", async function hashPassword() {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    try {
      const hashedPassword = await bcrypt.hash(document.password, 8);
      document.password = hashedPassword;
    } catch (err) {
      throw new Error("Something bad happened");
    }
  } else {
    throw new Error("Invalid data");
  }
});

// check password method
userSchema.methods.isCorrectPassword = function isCorrectPassword(password) {
  return bcrypt.compare(password, this.password);
};

const User = model("users", userSchema);

module.exports = User;
