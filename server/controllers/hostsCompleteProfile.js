const boom = require("boom");
const mongoose = require("mongoose");

const {
  updateUserProfile,
  findProfile,
  createNewProfile,
} = require("./../database/queries/profiles");
const { createNewListing } = require("./../database/queries/listings");

const { updateListing } = require("../database/queries/listing");
const { getListing } = require("../database/queries/listing/getListing");

module.exports = async (req, res, next) => {
  const { user } = req;

  if (!["host", "superhost"].includes(user.role)) {
    return next(boom.forbidden("only host can update his profile"));
  }
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
    const foundHostListing = await getListing(user._id);

    // update the host profile
    if (foundProfile) {
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        await updateUserProfile(user._id, profileData, session);
        if (foundHostListing) {
          await updateListing(user._id, listingData, session);
        } else {
          await createNewListing(listingData, session);
        }

        await session.commitTransaction();
        session.endSession();
      } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
      }
    } else {
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        await createNewProfile(profileData, session);
        await createNewListing(listingData, session);
        await session.commitTransaction();
        await session.endSession();
      } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
      }
    }

    res.json({ success: true });
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
