const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  referalCode: {
    type: Schema.Types.ObjectId,
    ref: 'referalCodes'
  },
  organisation: {
    type: Schema.Types.ObjectId,
    ref: 'organisations'
  },
  role: {
    type: String,
    enum: ['admin', 'superhost', 'host', 'organisation', 'intern'],
    required: true
  }
});

userSchema.pre('save', async function hashPasswrod() {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    try {
      const hashedPassword = await bcrypt.hash(document.password, 8);
      document.password = hashedPassword;
    } catch (err) {
      throw new Error('Something bad happened');
    }
  } else {
    throw new Error('Invalid data');
  }
});

// check password method
userSchema.methods.isCorrectPassword = function isCorrectPassword(password) {
  return bcrypt.compare(password, this.password);
};

const User = model('users', userSchema);

module.exports = User;
