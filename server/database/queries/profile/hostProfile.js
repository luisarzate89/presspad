const mongoose = require("mongoose");
const User = require("../../models/User");

const hostProfileData = userId => new Promise((resolve, reject) => {
  User.aggregate([
    // match user
    {
      $match: { _id: mongoose.Types.ObjectId(userId) },
    },

    // lookup profile

    // lookup listings

    // lookup reviews
  ])
    .then(response => resolve(response))
    .catch(error => reject(error));
});

export default hostProfileData;
