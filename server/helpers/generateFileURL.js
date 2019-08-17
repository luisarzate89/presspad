const { generateV4SignedUrl, getPublicFileUrl } = require("./storage");
const { storageBucket: bucketName } = require("./../config");


/**
 * get the image url from google cloud storage
 * the function edits the reference directly
 * @private
 * @param {Object} fileRef
 * @param {string} fileRef.fileName
 * @param {boolean} fileRef.isPrivate
 */
const generateUrl = async (fileRef) => {
  if (fileRef) {
    const { fileName, isPrivate } = fileRef;
    // check if the fileName is presented and not empty string
    if (fileName) {
      if (isPrivate) {
      // add url property to the reference
      // eslint-disable-next-line no-param-reassign
        fileRef.url = await generateV4SignedUrl(bucketName, fileName, "read");
        return;
      }
      // eslint-disable-next-line no-param-reassign
      fileRef.url = getPublicFileUrl(bucketName, fileName);
    }
  }
};

module.exports = generateUrl;
