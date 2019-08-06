const boom = require("boom");
const { getProfile } = require("../../database/queries/profile/getProfile");
const { getListing } = require("../../database/queries/listing/getListing");
const { storageBucket: bucketName } = require("../../config");
const { getPublicFileUrl, generateV4SignedUrl } = require("../../helpers/storage");

/**
 * get the image url from google cloud storage
 * the function edits the reference directly
 * @private
 * @param {Object} photoRef
 * @param {string} photoRef.fileName
 * @param {boolean} photoRef.isPrivate
 */
const _generateUrl = async (photoRef) => {
  const { fileName, isPrivate } = photoRef;
  // check if the fileName is presented and not empty string
  if (fileName) {
    if (isPrivate) {
      // add url property to the reference
      photoRef.url = await generateV4SignedUrl(bucketName, fileName, "read");
      return;
    }
    photoRef.url = getPublicFileUrl(bucketName, fileName);
  }
};

/**
 * get the profile data adn the listing based on the role
 * @param {string} _id user id
 * @param {string} role user role
 * @param {object} res http response object
 */

const _getProfileBasedRole = async (_id, role, res) => {
  // use lean() or toJSON() to convert mongoose document to json
  const profile = await getProfile(_id).lean();
  // you should check the object on the frontEnd
  if (!profile) return res.json({});

  const { pressPass, profileImage, verification: { photoID } } = profile;
  await Promise.all([_generateUrl(pressPass), _generateUrl(profileImage), _generateUrl(photoID)]);

  if (role === "host" || role === "superhost") {
    const listing = await getListing(_id).lean();
    await Promise.all(listing.photos.map(_generateUrl));
    return res.json({ profile, listing });
  }

  return res.json({ profile });
};

module.exports = async (req, res, next) => {
  const { _id, role } = req.user;
  try {
    _getProfileBasedRole(_id, role, res);
  } catch (err) {
    next(boom.badImplementation(err));
  }
};
