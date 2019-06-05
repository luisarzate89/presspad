const Profile = require("./../models/Profile");

module.exports.updateUserProfile = (userId, data) => Profile.updateOne({ user: userId }, data);
