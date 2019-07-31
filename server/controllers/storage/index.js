const { generateV4SignedUrl } = require('../../helpers/storageHelpers');

const getUploadSignedURL = (req, res, next) => {
  const { storageBucket: bucketName } = process.env;
  const { fileName } = req.query;

  generateV4SignedUrl(bucketName, fileName, "write")
    .then(signedUrl => {
      res.json({ signedUrl, bucketName });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { getUploadSignedURL };
