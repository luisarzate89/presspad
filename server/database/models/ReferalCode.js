const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// a host needs to be referred by a superhost
// the code is the userID
// we store the refferer in the user table of the reffered host
const referalCodeSchema = new Schema({
  referrer: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  referred: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

const ReferalCode = model('referalCodes', referalCodeSchema);

module.exports = ReferalCode;
