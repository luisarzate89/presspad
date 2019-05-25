const router = require("express").Router();
const hostsCompleteProfile = require("./../controllers/hostsCompleteProfile");
const multer = require("./../middlewares/multer");
const googleStorage = require("./../middlewares/googleStorage");
const deleteFromServer = require("./../middlewares/deleteFromServer");
const { multerFields } = require("./../constants");

const { hostCompleteProfile } = multerFields;
router.post(
  "/hosts/complete-profile",
  multer(hostCompleteProfile),
  googleStorage(),
  deleteFromServer(),
  hostsCompleteProfile,
);
module.exports = router;
