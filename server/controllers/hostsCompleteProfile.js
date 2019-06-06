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
      pressPass: req.body.pressPass,
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
      otherInfo: JSON.parse(req.body.offerOtherInfo),
      photos: [req.body.offerImages1, req.body.offerImages2, req.body.offerImages3],
      availableDates: JSON.parse(req.body.availableDates),
    };
    const foundProfile = await findProfile(user._id);

    // update the host profile
    if (foundProfile) {
      await updateUserProfile(user._id, profileData).catch(err => console.log("err profile update", err));
    }
    await createNewProfile(profileData).catch(err => console.log("err creating profile", err));

    // create new listing
    await createNewListing(listingData).catch(err => console.log("err listing update", err));

    res.json({ success: true });
  } catch (error) {
    next(boom.badImplementation());
  }
};
