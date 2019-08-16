const Profile = require("./../models/Profile");

module.exports.updateUserProfile = (userId, data) => Profile
  .updateOne({ user: userId }, data, { omitUndefined: true });

module.exports.findProfile = userId => Profile.findOne({ user: userId });

module.exports.createNewProfile = data => Profile.create(data);
