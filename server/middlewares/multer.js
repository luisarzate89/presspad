const multer = require("multer");
const boom = require("boom");

// fieldsArray for filtering and validating the files
module.exports = fieldsArray => (req, res, next) => {
  // storage config
  const storage = multer.diskStorage({
    destination(destinationReq, file, cb) {
      cb(null, "uploads/");
    },
    filename(fileReq, file, cb) {
      const extention = file.originalname.split(".")[file.originalname.split(".").length - 1];
      const fileName = file.originalname.split(".")[0];
      cb(null, `${fileName}-${Date.now()}.${extention}`);
    },
  });

  const upload = multer({
    storage,
    fileFilter(fileReq, file, callback) {
      const fileAllowed = fieldsArray.reduce((prev, curr) => {
        if (curr.name === file.fieldname) {
          return true;
        }
        return prev || false;
      }, false);

      // if the uploaded field not listed in the fieldsArray object return error
      return callback(!fileAllowed ? true : null, true);
    },
  }).any();

  upload(req, res, (err) => {
    if (err) {
      return next(boom.badImplementation("Error while uploading files"));
    }
    return next();
  });
};
