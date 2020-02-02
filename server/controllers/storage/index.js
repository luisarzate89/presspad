const boom = require('boom');

const { generateV4SignedUrl } = require('../../helpers/storage');
const { storageBucket: bucketName } = require('../../config');

const getUploadSignedURL = (req, res, next) => {
  const { fileName } = req.query;

  generateV4SignedUrl(bucketName, fileName, 'write')
    .then(signedUrl => {
      res.json({ signedUrl, bucketName });
    })
    .catch(err => {
      next(boom.badImplementation(err));
    });
};

module.exports = { getUploadSignedURL };
