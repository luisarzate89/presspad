const boom = require("boom");
const fs = require("fs");

module.exports = () => (req, res, next) => {
  if (!req.files) {
    return next();
  }

  // iterate through the uploaded files and delete them from the server
  try {
    req.files.forEach((file) => {
      const filePath = file.path;
      return fs.unlink(filePath, (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      });
    });

    return next();
  } catch (error) {
    return next(boom.badImplementation("Error while uploading photo"));
  }
};
