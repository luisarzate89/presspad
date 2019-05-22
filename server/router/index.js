const router = require("express").Router();

const loginController = require("./../controllers/user/login");

router.post("/user/login", loginController);

module.exports = router;
