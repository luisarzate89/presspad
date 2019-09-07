const boom = require("boom");
const { deleteListingPhotoQ } = require("../../database/queries/listing");
const { deleteFile } = require("../../helpers/storage");
const { storageBucket: bucketName } = require("../../config");

const deleteListingPhotos = async (req, res, next) => {
  const {
    user,
    body: { fileNameTobeDeleted },
  } = req;

  if (user.role !== "host") {
    return next(boom.forbidden("only host can update his profile"));
  }

  try {
    await deleteFile(bucketName, fileNameTobeDeleted);
    const result = await deleteListingPhotoQ(user._id, fileNameTobeDeleted);
    return res.json(result);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = deleteListingPhotos;
