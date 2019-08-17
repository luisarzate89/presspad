const boom = require("boom");
const {
  updateUserProfile,
  findProfile,
  createNewProfile,
} = require("./../database/queries/profiles");
const { createNewListing } = require("./../database/queries/listings");

module.exports = async (req, res, next) => {
  const { user } = req;
  try {
    const profileData = {
      user: user._id,
      bio: req.body.bio,
      interests: req.body.interests,
      organisation: {
        name: req.body.organisationName,
        website: req.body.organisationWebsite,
      },
      jobTitle: req.body.jobTitle,
      profileImage: req.body.profileImage,
    };

    const listingData = {
      user: user._id,
      address: {
        street: req.body.addressLine1,
        borough: req.body.addressLine2,
        city: req.body.addressCity,
        postcode: req.body.addressPostCode,
      },
      description: req.body.offerDescription,
      otherInfo: req.body.offerOtherInfo,
      photos: req.body.photos,
      availableDates: req.body.availableDates,
    };
    const foundProfile = await findProfile(user._id);

    // update the host profile
    if (foundProfile) {
      await updateUserProfile(user._id, profileData);
    } else {
      await createNewProfile(profileData);
      // create new listing
      await createNewListing(listingData);
    }

    res.json({ success: true });
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
