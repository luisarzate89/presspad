const Profile = require("../../models/Profile");

module.exports.approveRejectProfile = (profileId, bool) => Profile.findOneAndUpdate({ _id: profileId }, { verified: bool });
