const boom = require("boom");

// queries
const { getProfileByRoleAndId } = require("../../database/queries/profile/getProfile");

// validation
const internCompleteProfileSchema = require("../../middlewares/validation/internCompleteProfileSchema");
const { validate } = require("../../middlewares/validation/index");


/**
 * get the profile data adn the listing based on the role
 * @param {string} _id user id
 * @param {string} role user role
 */

const _getProfileBasedRole = async (_id, role) => {
  // use lean() or toJSON() to convert mongoose document to json
  const profile = await getProfileByRoleAndId(_id, role);
  return profile;
};

module.exports = async (req, res, next) => {
  const { _id, role } = req.user;
  if (role !== "intern") {
    return next(boom.forbidden("Only interns can book a stay"));
  }
  try {
    const profile = await _getProfileBasedRole(_id, "intern");
    console.log('profile', profile)
    if (!profile.length) {
      return next(boom.notFound("You have no profile"));
    }
    const { verified } = profile;

    let isComplete = false;
    try {
      await validate(internCompleteProfileSchema, profile);
      isComplete = true;
      return res.send({ isComplete, verified });
    } catch (error) {
      if (error.name === "ValidationError") {
        isComplete = false;
        return res.send({ isComplete, verified });
      }
      throw error;
    }
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};
