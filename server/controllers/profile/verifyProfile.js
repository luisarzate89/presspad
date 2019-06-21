// expect boolean and profileId

const boom = require("boom");

// QUERIES
const { approveRejectProfile } = require("./../../database/queries/profile/verifyProfile");

module.exports = async (req, res, next) => {
  const { verify, profileId } = req.body;

  console.log(verify)
  console.log(profileId)

  return approveRejectProfile(profileId, verify)
    .then(() => res.json("success"))
    .catch(err => next(boom.badRequest("Error changing verification status")));
};
