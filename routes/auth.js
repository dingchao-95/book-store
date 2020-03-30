const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

module.exports = express.Router();

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);

router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;