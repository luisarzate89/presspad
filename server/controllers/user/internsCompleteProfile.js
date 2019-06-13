const boom = require("boom");
const {
  updateUserProfile,
  findProfile,
  createNewProfile,
} = require("./../../database/queries/profiles");


module.exports = async (req, res, next) => {
  const { user } = req;

  try {
    const profileData = {
      user: user._id,
    };

    Object.keys(req.body).forEach((key) => {
      profileData[key] = req.body[key];
    });

    const foundProfile = await findProfile(user._id);


    // update the intern profile
    if (foundProfile) {
      await updateUserProfile(user._id, profileData);
    } else {
      await createNewProfile(profileData);
    }

    res.json({ success: true });
  } catch (error) {
    next(boom.badImplementation());
  }
};
