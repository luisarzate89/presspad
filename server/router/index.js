const router = require("express").Router();

// IMPORT CONTROLLERS
const loginController = require("./../controllers/user/login");
const userInfo = require("./../controllers/user/userInfo");
const signUpController = require("./../controllers/user/signup");
const getUserByReferral = require("./../controllers/user/getUserByReferral");

// IMPORT MIDDLEWARES
const softAuthCheck = require("./../middlewares/softAuthCheck");

// API ROUTES
const {
  LOGIN_URL,
  USER_URL,
  SIGNUP_URL,
  CHECK_REFERRAL_URL,
} = require("../../client/src/constants/apiRoutes");

// get user info from the cookie if it exists and send to front end
router.get(USER_URL, softAuthCheck, userInfo);

// USE CONTROLLERS
router.post(LOGIN_URL, loginController);
router.post(SIGNUP_URL, signUpController);
router.post(CHECK_REFERRAL_URL, getUserByReferral);

module.exports = router;
