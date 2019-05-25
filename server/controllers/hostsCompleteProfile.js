const boom = require("boom");
const User = require("./../database/models/User");
const { updateUserProfile } = require("./../database/queries/profiles");
const { createNewListing } = require("./../database/queries/listings");

module.exports = async (req, res, next) => {
  // for now it will get the user from the request (if we have authentication middleware)
  // if no user object in the request it will get the first host user
  const user = req.user || await User.findOne({ role: "host" });
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
      pressPass: req.body.pressPass,
    };

    const listingData = {
      user: user._id,
      address: {
        line1: req.body.addressLine1,
        line2: req.body.addressLine2,
        city: req.body.addressCity,
        postcode: req.body.addressPostCode,
      },
      description: req.body.offerDescription,
      otherInfo: JSON.parse(req.body.offerOtherInfo),
      photos: [req.body.offerImages1, req.body.offerImages2, req.body.offerImages3],
      availableDates: JSON.parse(req.body.availableDates),
    };

    // update the host profile
    await updateUserProfile(user._id, profileData);

    // create new listing
    await createNewListing(listingData);
    res.json({ success: true });
  } catch (error) {
    next(boom.badImplementation());
  }
};
