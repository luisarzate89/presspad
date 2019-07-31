const { getSignedUrl } = require('../../helpers/storageHelpers');

exports.getUploadSignedURL = (req, res, next) => {
  const bucketName = process.env.storageBucket;
  const { fileName } = req.query;

  getSignedUrl(bucketName, fileName, "write")
    .then(signedUrl => {
      res.json({ signedUrl, bucketName });
    })
    .catch(err => {
      next(err);
    });
};
