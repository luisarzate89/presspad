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

  if (user.role !== "host") {
    return next(boom.forbidden("only host can update his profile"));
  }

  const {
    birthDate,
    hometown,
    gender,
    school,
    bio,
    profileImage,
    fileName,
    isPrivate,
    jobTitle,
    organisation,
    workingArea,
    hostingReasonAnswer,
    mentoringExperienceAnswer,
    industryExperienceAnswer,
    backgroundAnswer,
    photos,
    address,
    availableDates,
    accommodationChecklist,
    neighbourhoodDescription,
    otherInfo,
    photoID,
    hearAboutPressPadAnswer,
    phoneNumber,
    reference1,
    reference2,
    DBSCheck,
    sexualOrientation,
    degreeLevel,
    ethnicity,
    parentProfession,
    disability,
    parentsWorkInPress,
    caringResponsibilities,
    consentedOnPressPadTerms,
  } = req.body;

  const profileData = {
    user: user._id,
    birthDate,
    hometown,
    gender,
    school,
    bio,
    profileImage,
    fileName,
    isPrivate,
    jobTitle,
    organisation,
    workingArea,
    hostingReasonAnswer,
    mentoringExperienceAnswer,
    industryExperienceAnswer,
    backgroundAnswer,
    photoID,
    hearAboutPressPadAnswer,
    phoneNumber,
    reference1,
    reference2,
    DBSCheck,
    sexualOrientation,
    degreeLevel,
    ethnicity,
    parentProfession,
    disability,
    parentsWorkInPress,
    caringResponsibilities,
    consentedOnPressPadTerms,
  };

  const listingData = {
    user: user._id,
    photos,
    address,
    availableDates,
    accommodationChecklist,
    neighbourhoodDescription,
    otherInfo,
    hometown,
  };

  try {
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
