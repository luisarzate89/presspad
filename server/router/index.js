const router = require("express").Router();

// IMPORT CONTROLLERS
const loginController = require("./../controllers/user/login");
const userInfo = require("./../controllers/user/userInfo");
const signUpController = require("./../controllers/user/signup");
const getUserByReferral = require("./../controllers/user/getUserByReferral");
const getAllOrgs = require("./../controllers/user/getAllOrgs");
const hostsCompleteProfile = require("./../controllers/hostsCompleteProfile");
const getHostProfile = require("./../controllers/profile/getHostProfile");
const searchProfiles = require("./../controllers/profile/searchProfiles");

// IMPORT MIDDLEWARES
const softAuthCheck = require("./../middlewares/softAuthCheck");
const multer = require("./../middlewares/multer");
const googleStorage = require("./../middlewares/googleStorage");
const deleteFromServer = require("./../middlewares/deleteFromServer");

// API ROUTES
const {
  LOGIN_URL,
  USER_URL,
  SIGNUP_URL,
  CHECK_REFERRAL_URL,
  GET_ORGS_URL,
  HOST_PROFILE_URL,
  HOST_COMPLETE_PROFILE,
  SEARCH_PROFILES_URL,
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

// search for available listings
router.post(SEARCH_PROFILES_URL, searchProfiles);

// USE CONTROLLERS
router.post(LOGIN_URL, loginController);
router.post(SIGNUP_URL, signUpController);
router.post(CHECK_REFERRAL_URL, getUserByReferral);
router.get(GET_ORGS_URL, getAllOrgs);

module.exports = router;
