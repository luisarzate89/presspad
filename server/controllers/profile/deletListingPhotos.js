const boom = require("boom");
const Listing = require("../../database/models/Listing");
const { deleteFile } = require("../../helpers/storage");
const { storageBucket: bucketName } = require("../../config");

const deleteListingPhotos = async (req, res, next) => {
  const { user } = req;
  console.log("Hello I am a Host");

  if (user.role !== "host") {
    return next(boom.forbidden("only host can update his profile"));
  }

  try {
    console.log(req.body);
    await deleteFile(bucketName, req.body.fileName);
    // deleteListingsPhotosQ
    const result = await Listing.updateOne({ _id: user._id }, {
      $set: { photos: req.body.listingPhotos },
    });

    console.log(1111, result);
    res.json(result);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = deleteListingPhotos;
