const router = require("express").Router();

// IMPORT CONTROLLERS
const loginController = require("./../controllers/user/login");

// API ROUTES
const { LOGIN_URL } = require("../../client/src/constants/apiRoutes");

// USE CONTROLLERS
router.post(LOGIN_URL, loginController);

module.exports = router;
