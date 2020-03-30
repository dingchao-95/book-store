const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { check, body } = require("express-validator/check");
const User = require("../models/user");

module.exports = express.Router();

router.get("/login", authController.getLogin);
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("please enter a valid email.")
      .normalizeEmail(),
    body("password", "Password has to be valid.")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
  ],
  authController.postLogin
);
router.post("/logout", authController.postLogout);

router.get("/signup", authController.getSignup);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please Enter a valid Email")
      .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("This email address is forbidden");
        // }
        // return true;
        return User.findOne({ email: email }).then(userDoc => {
          if (userDoc) {
            return new Promise.reject(
              "Email already exists, please enter a new one"
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password that has minimum 6 characters(Alphanumeric)"
    )
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Mismatch of passwords, please try again");
        }
        return true;
      })
  ],
  authController.postSignup
);

router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);
module.exports = router;
