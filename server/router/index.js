const router = require("express").Router();
const hostsCompleteProfile = require("./../controllers/hostsCompleteProfile");
const multer = require("./../middlewares/multer");
const googleStorage = require("./../middlewares/googleStorage");
const deleteFromServer = require("./../middlewares/deleteFromServer");

router.post(
  "/hosts/complete-profile",
  multer(),
  googleStorage(),
  deleteFromServer(),
  hostsCompleteProfile,
);
module.exports = router;
