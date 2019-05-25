const router = require("express").Router();
const hostsCompleteProfile = require("./../controllers/hostsCompleteProfile");
const multer = require("./../middlewares/multer");
const googleStorage = require("./../middlewares/googleStorage");

router.post("/hosts/complete-profile", multer(), googleStorage(), hostsCompleteProfile);
module.exports = router;
