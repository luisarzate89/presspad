const Profile = require("./../models/Profile");

module.exports.updateUserProfile = (userId, data, session) => Profile
  .updateOne({ user: userId }, data, { omitUndefined: true, session });

module.exports.findProfile = userId => Profile.findOne({ user: userId });

module.exports.createNewProfile = (data, session) => Profile.create([data], { session });
