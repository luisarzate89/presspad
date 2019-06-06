const multer = require("multer");
const boom = require("boom");


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

  const upload = multer({ storage }).fields(fieldsArray);

  upload(req, res, (err) => {
    if (err) {
      return next(boom.badImplementation("Error while uploading files"));
    }
    return next();
  });
};
