const getSignedUrl = require('../../helpers/getSignedUrl');

exports.getUploadSignedURL = (req, res, next) => {
  const bucketName = process.env.storageBucket;
  const { fileName } = req.query;

  getSignedUrl(bucketName, fileName, "write")
    .then(signedUrl => {
      res.json({ signedUrl });
    })
    .catch(err => {
      next(err);
    });
};
