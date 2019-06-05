const router = require("express").Router();

// IMPORT CONTROLLERS
const loginController = require("./../controllers/user/login");
const userInfo = require("./../controllers/user/userInfo");
const hostsCompleteProfile = require("./../controllers/hostsCompleteProfile");
const getHostProfile = require("./../controllers/profile/getHostProfile");

// IMPORT MIDDLEWARES
const softAuthCheck = require("./../middlewares/softAuthCheck");
const multer = require("./../middlewares/multer");
const googleStorage = require("./../middlewares/googleStorage");
const deleteFromServer = require("./../middlewares/deleteFromServer");

// API ROUTES
const {
  LOGIN_URL,
  USER_URL,
  HOST_PROFILE_URL,
  HOST_COMPLETE_PROFILE,
} = require("../../client/src/constants/apiRoutes");

// CONSTANTS
const { multerFields } = require("./../constants");

const { hostCompleteProfile } = multerFields;

// update host profile and create new offer
router.post(
  HOST_COMPLETE_PROFILE,
  softAuthCheck,
  multer(hostCompleteProfile),
  googleStorage(),
  deleteFromServer(),
  hostsCompleteProfile,
);

// get user info from the cookie if it exists and send to front end
router.get(USER_URL, softAuthCheck, userInfo);

// gets hosts profile data
router.post(HOST_PROFILE_URL, getHostProfile);

// USE CONTROLLERS
router.post(LOGIN_URL, loginController);

module.exports = router;
