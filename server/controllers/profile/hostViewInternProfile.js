const boom = require('boom');
const mongoose = require('mongoose');

const generateUrl = require('../../helpers/generateFileURL');
const internProfileData = require('./../../database/queries/profile/internPublicProfile');

module.exports = async (req, res, next) => {
  try {
    const { id: internId } = req.params;
    const { role } = req.user;
    // check for role
    if (!['host', 'organisation'].includes(role)) {
      return next();

      // ToDo check autherization for the other route??
      // return next(boom.forbidden());
    }

    if (!mongoose.Types.ObjectId.isValid(internId)) {
      return next(boom.notFound());
    }

    // get intern's basic profile data
    const profileData = await internProfileData(internId);

    if (!profileData[0]) return next(boom.notFound());

    if (profileData[0].profile && profileData[0].profile.profileImage) {
      await generateUrl(profileData[0].profile.profileImage);
    }

    const {
      reference1,
      reference2,
      ...publicProfileData
    } = profileData[0].profile;
    const referencesNum =
      ((reference1 && reference1.name && 1) || 0) +
      ((reference2 && reference2.name && 1) || 0);

    publicProfileData.referencesNum = referencesNum;
    publicProfileData.name = profileData[0].name;

    return res.json(publicProfileData);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
