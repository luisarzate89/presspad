const router = require("express").Router();

// IMPORT CONTROLLERS
const loginController = require("./../controllers/user/login");
const userInfo = require("./../controllers/user/userInfo");
const getHostProfile = require("./../controllers/profile/getHostProfile");

// IMPORT MIDDLEWARES
const softAuthCheck = require("./../middlewares/softAuthCheck");

// API ROUTES
const { LOGIN_URL, USER_URL, HOST_PROFILE_URL } = require("../../client/src/constants/apiRoutes");

// get user info from the cookie if it exists and send to front end
router.get(USER_URL, softAuthCheck, userInfo);

// gets hosts profile data
router.post(HOST_PROFILE_URL, getHostProfile);

// USE CONTROLLERS
router.post(LOGIN_URL, loginController);

module.exports = router;
