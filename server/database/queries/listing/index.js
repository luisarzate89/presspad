const Listing = require("../../models/Listing");

const updateListing = (userId, data, s) => Listing
  .updateOne({ user: userId }, data, { omitUndefined: true, session: s });

const deleteListingPhotoQ = (userId, fileNameToBeDeleted) => Listing.updateOne(
  { user: userId },
  {
    $pull: {
      photos: {
        fileName: fileNameToBeDeleted,
      },
    },
  },
);

module.exports = { updateListing, deleteListingPhotoQ };
