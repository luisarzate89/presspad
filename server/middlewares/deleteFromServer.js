const boom = require("boom");
const fs = require("fs");

module.exports = () => (req, res, next) => {
  if (!req.files) {
    return next();
  }

  // iterate through the uploaded files and delelte them from the server
  const files = Object.values(req.files);
  try {
    files.forEach((file) => {
      const filePath = file[0].path;
      return fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });

    return next();
  } catch (error) {
    return next(boom.badImplementation("Error while uploading photo"));
  }
};
