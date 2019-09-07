// expect boolean and profileId

const boom = require("boom");

// QUERIES
const { approveRejectProfile } = require("./../../database/queries/profile/verifyProfile");
const profileApprovedToHost = require("./../../helpers/mailHelper/profileApprovedToHost");
const { getUserDataByProfileId } = require("./../../database/queries/profile/getProfile");

module.exports = async (req, res, next) => {
  const { verify, profileId } = req.body;
  try {
    await approveRejectProfile(profileId, verify);
    // if admin approved host's profile

    if (verify && process.env.NODE_ENV === "production") {
      // get host details
      const [host] = await getUserDataByProfileId(profileId);
      // send email to host
      await profileApprovedToHost(host);
    }
    res.json({});
  } catch (error) {
    next(boom.badRequest(error));
  }
};
