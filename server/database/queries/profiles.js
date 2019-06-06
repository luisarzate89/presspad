const Profile = require("./../models/Profile");

module.exports.updateUserProfile = (userId, data) => Profile.updateOne({ user: userId }, data);

module.exports.findProfile = userId => Profile.find({ user: userId });

module.exports.createNewProfile = data => Profile.create(data);
