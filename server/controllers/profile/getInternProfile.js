// expect userID
// responds with data obj: user info, (profile |& reviews)

const boom = require('boom');
const mongoose = require('mongoose');

const generateUrl = require('./../../helpers/generateFileURL');

// QUERIES
const {
  internProfileData,
} = require('./../../database/queries/profile/internProfile');

const { getUserReviews } = require('./../../database/queries/user/index');
const {
  getInternBookingsWithReviews,
} = require('./../../database/queries/bookings');

module.exports = async (req, res, next) => {
  try {
    const { id: internId } = req.params;
    const { _id: userId, role } = req.user;
    const { expand } = req.query;

    // check if user id is in request
    if (!internId) {
      return next(boom.badRequest('error loading profile'));
    }

    if (!mongoose.Types.ObjectId.isValid(internId)) {
      return next(boom.notFound());
    }

    if (
      internId !== userId.toString() &&
      role !== 'admin' &&
      role !== 'organisation'
    ) {
      return next(boom.forbidden());
    }

    // Basic profile
    const dataParams = [{ userInfo: 'single' }];
    const promisesArray = [internProfileData(internId)];

    if (expand && expand.includes('bookings') && expand.includes('reviews')) {
      // get the intern's bookings and with reviews
      dataParams.push({ bookingsWithReviews: 'array' });
      promisesArray.push(getInternBookingsWithReviews(internId));
    } else if (expand && expand.includes('reviews')) {
      // get the intern's reviews
      dataParams.push({ reviews: 'array' });
      promisesArray.push(getUserReviews(internId));
    }

    const data = await Promise.all(promisesArray);

    // if no profile data return 404
    if (!data[0].length) {
      return next(boom.notFound("Cannot find the profile you're looking for"));
    }

    const formedData = {};
    dataParams.forEach((item, index) => {
      const [key, value] = Object.entries(item)[0];

      if (value === 'single') {
        // eslint-disable-next-line prefer-destructuring
        formedData[key] = data[index][0];
      } else {
        formedData[key] = data[index];
      }
    });

    const { profile } = formedData.userInfo;

    // get the file links
    if (profile) {
      const promises = [];
      promises.push(generateUrl(profile.photoID));
      promises.push(generateUrl(profile.offerLetter));

      if (profile.profileImage) {
        promises.push(generateUrl(profile.profileImage));
      }
      await Promise.all(promises);
    }

    return res.json(formedData);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
