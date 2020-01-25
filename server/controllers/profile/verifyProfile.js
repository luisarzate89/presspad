// expect boolean and profileId

const boom = require("boom");

// QUERIES
const {
  approveRejectProfile,
} = require("./../../database/queries/profile/verifyProfile");
const profileApprovedToHost = require("./../../helpers/mailHelper/profileApprovedToHost");
const {
  getUserDataByProfileId,
} = require("./../../database/queries/profile/getProfile");

module.exports = async (req, res, next) => {
  const { verify, profileId } = req.body;
  if (req.user.role !== "admin")
    return next(boom.forbidden("Only admin can access this route"));
  try {
    await approveRejectProfile(profileId, verify);
    // if admin approved host's profile

    if (verify && process.env.NODE_ENV === "production") {
      // get host details
      const [host] = await getUserDataByProfileId(profileId);
      // send email to host
      await profileApprovedToHost(host);
    }
    return res.json("success");
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
