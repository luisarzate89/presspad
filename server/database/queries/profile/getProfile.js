const Profile = require("../../models/Profile");

module.exports.getProfile = id => Profile.findOne({ user: id });