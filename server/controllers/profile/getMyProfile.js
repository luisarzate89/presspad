const boom = require("boom");
const { getProfile } = require("../../database/queries/profile/getProfile");
const { getListing } = require("../../database/queries/listing/getListing");

module.exports = async (req, res, next) => {
  const { _id, role } = req.user;
  try {
    if ( role === "intern" ) {
      const profile = await getProfile(_id);
      res.json(profile);
    } else if ( role === "host" || role === "superhost" ) {
      const [profile, listing] = await Promise.all([getProfile(_id), getListing(_id)]);
      res.json({ profile, listing });
    }
  } catch (err) {
    next(boom.badImplementation(err));
  }
};
