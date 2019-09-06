const boom = require("boom");
const Listing = require("../../database/models/Listing");

const deleteListingPhotos = async (req, res, next) => {
  const { user } = req;
  console.log("Hello I am a Host");

  if (user.role !== "host") {
    return next(boom.forbidden("only host can update his profile"));
  }

  // delete from firebase
  try {
    const result = await Listing.deleteListingsPhotosQ(user._id, {
      $set: { photos: req.body },
    });
    console.log(result);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = deleteListingPhotos;
