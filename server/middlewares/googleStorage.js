const boom = require("boom");

const { admin } = require("../config");


/**
 * function returns a middleware
 * that upload the file to Google storage
 * and return the uploaded urls in the req.body
 */

module.exports = () => async (req, res, next) => {
  if (!req.files) {
    return next(boom.badImplementation());
  }

  try {
    const bucket = admin.storage().bucket();
    const requests = [];
    const fieldsNames = [];
    // iterate through the files
    req.files.forEach((file) => {
      // make an array of promises to upload the files
      fieldsNames.push(file);

      requests.push(bucket.upload(file.path, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
      }));
    });

    // upload the files array
    const uploadedFiles = await Promise.all(requests);

    // signed url options
    const options = {
      action: "read",
      expires: "03-17-3000",
    };

    // create an array of getting signed urls requests
    const urlRequests = uploadedFiles.map(item => bucket.file(item[0].name)
      .getSignedUrl(options));

    // get the urls at once
    const urls = await Promise.all(urlRequests);

    // add the url into the req.body as req.body.fieldName = url
    urls.forEach((url, index) => {
      const fieldName = fieldsNames[index];

      const [urlText] = url;
      req.body[fieldName.fieldname] = urlText;
    });
  } catch (error) {
    next(boom.badImplementation("Error while uploading files"));
  }

  return next();
};
