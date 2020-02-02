const boom = require('boom');
const { deleteListingPhotoQ } = require('../../database/queries/listing');
const { deleteFile } = require('../../helpers/storage');
const { storageBucket: bucketName } = require('../../config');

const deleteListingPhotos = async (req, res, next) => {
  const {
    user,
    body: { fileNameTobeDeleted },
  } = req;

  if (!['host', 'superhost'].includes(user.role)) {
    return next(boom.forbidden('only host can update his profile'));
  }

  try {
    try {
      /*
      this will result on undefined with sucess 
      and 404 not found error
      */
      await deleteFile(bucketName, fileNameTobeDeleted);
    } catch (err) {
      /*
      catching the error here if it is 404 don't 
      do anything and continue with the rest of code
      */
      if (err.code !== 404) throw err;
    }
    const result = await deleteListingPhotoQ(user._id, fileNameTobeDeleted);
    return res.json(result);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = deleteListingPhotos;
