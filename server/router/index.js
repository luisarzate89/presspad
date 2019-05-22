const router = require("express").Router();

// IMPORT CONTROLLERS
const loginController = require("./../controllers/user/login");
const userInfo = require("./../controllers/user/userInfo");

// IMPORT MIDDLEWARES
const softAuthCheck = require("./../middlewares/softAuthCheck");

// API ROUTES
const { LOGIN_URL, USER_URL } = require("../../client/src/constants/apiRoutes");

// get user info from the cookie if it exists and send to front end
router.get(USER_URL, softAuthCheck, userInfo);

// USE CONTROLLERS
router.post(LOGIN_URL, loginController);

module.exports = router;
